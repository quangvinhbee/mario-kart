import { RacePreview } from '@/components/common/RacePreview'
import { useMarioKart } from '@/providers/game-provider'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

enum DisplayType {
  BetAmount,
  TotalBet,
}

interface CountdownBetProps {
  onBet?: VoidFunction
}

export const CountdownBet = (props: CountdownBetProps) => {
  const { betHandler, currentGame, userBalance } = useMarioKart()

  const [betMarioAmount, setBetMarioAmount] = useState(0)
  const [betYoshiAmount, setBetYoshiAmount] = useState(0)
  const [betBowerAmount, setBetBowerAmount] = useState(0)
  const [betToadAmount, setBetToadAmount] = useState(0)
  const [disableBet, setDisableBet] = useState(false)
  const [isBetted, setIsBetted] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const [displayType, setDisplayType] = useState(DisplayType.BetAmount)
  const [totalBetAll, settotalBetAll] = useState([
    {
      name: 'mario',
      frameImage: '/assets/game/frame-mario.png',
      amount: betMarioAmount,
      onChange: setBetMarioAmount,
      totalBet: 0,
    },
    {
      name: 'yoshi',
      frameImage: '/assets/game/frame-yoshi.png',
      amount: betYoshiAmount,
      onChange: setBetYoshiAmount,
      totalBet: 0,
    },
    {
      name: 'bower',
      frameImage: '/assets/game/frame-bower.png',
      amount: betBowerAmount,
      onChange: setBetBowerAmount,
      totalBet: 0,
    },
    {
      name: 'toad',
      frameImage: '/assets/game/frame-toad.png',
      amount: betToadAmount,
      onChange: setBetToadAmount,
      totalBet: 0,
    },
  ])

  const onBet = async () => {
    try {
      if (disableBet) return
      let dataBetting = {
        mario: {
          amount: betMarioAmount,
        },
        yoshi: {
          amount: betYoshiAmount,
        },
        toad: {
          amount: betToadAmount,
        },
        bower: {
          amount: betBowerAmount,
        },
      }

      await betHandler(dataBetting)
    } catch (e) {
      console.log(e.message)
    }
  }

  const displayedTime = () => {
    let seconds: any = secondsRemaining % 60
    let minutes: any = Math.floor((secondsRemaining % (60 * 60)) / 60)
    let hours: any = Math.floor(secondsRemaining / (60 * 60))
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (hours < 10) {
      hours = '0' + hours
    }
    return `${hours}:${minutes}:${seconds}`
  }

  const handleChangeDisplayType = (changeType: 'prev' | 'next') => {
    const length: number = Object.values(DisplayType)?.length / 2
    let index: number = displayType

    if (changeType === 'prev') {
      index--
      if (index < 0) {
        index = length - 1
      }
    }
    if (changeType === 'next') {
      index = (index + 1) % length
    }

    setDisplayType(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const s = (new Date(Number(currentGame?.endAt || 0)).getTime() - new Date().getTime()) / 1000
      setSecondsRemaining(Math.max(Math.round(s), 0))
      if (s <= 5) {
        setDisableBet(true)
      } else {
        setDisableBet(false)
      }
    }, 1000)

    settotalBetAll([
      ...[
        {
          name: 'mario',
          frameImage: '/assets/game/frame-mario.png',
          amount: betMarioAmount,
          onChange: setBetMarioAmount,
          totalBet: currentGame.totalMario,
        },
        {
          name: 'yoshi',
          frameImage: '/assets/game/frame-yoshi.png',
          amount: betYoshiAmount,
          onChange: setBetYoshiAmount,
          totalBet: currentGame.totalYoshi,
        },
        {
          name: 'bower',
          frameImage: '/assets/game/frame-bower.png',
          amount: betBowerAmount,
          onChange: setBetBowerAmount,
          totalBet: currentGame.totalBower,
        },
        {
          name: 'toad',
          frameImage: '/assets/game/frame-toad.png',
          amount: betToadAmount,
          onChange: setBetToadAmount,
          totalBet: currentGame.totalToad,
        },
      ],
    ])

    return () => {
      clearInterval(interval)
    }
  }, [currentGame])

  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="container mx-auto max-w-screen-lg relative flex w-full flex-wrap items-center justify-between px-[16px] pt-[100px]">
        <div className="w-[100%]">
          <Link href="/leaderboard" className="flex cursor-pointer items-center space-x-[8px]">
            <img className="w-[32px]" src="/assets/game/cup.png" alt="" />
            <p className="uppercase">leader board</p>
          </Link>
        </div>
        <div
          className={`relative flex w-[60%] max-w-[760px] flex-wrap justify-between pt-[52px] ${
            disableBet && 'opacity-75'
          }`}
        >
          {totalBetAll?.map((item, i) => (
            <div className="mb-[32px] w-[45%]" key={'' + i + DisplayType.BetAmount}>
              <div className="flex justify-between">
                <p className="text-[14px]">{item?.name}</p>
                <p>{displayType === DisplayType.BetAmount ? 'Bet amount' : 'Total Bet'}</p>
              </div>
              <div className="flex justify-between">
                <img className="w-[24%]" src={item?.frameImage} alt="" />
                <div className="relative w-[74%]">
                  <img
                    className="aspect-[257/93] w-full"
                    src="/assets/game/frame-input.png"
                    alt=""
                  />
                  <div className="absolute inset-x-[12%] inset-y-[18%] flex items-center">
                    <NumericFormat
                      displayType={displayType === DisplayType.BetAmount ? 'input' : 'text'}
                      className={
                        'w-[calc(100%-36px-16px)] text-right font-retro text-[20px] outline-none placeholder:text-black' +
                        ` ${displayType === DisplayType.BetAmount ? 'h-[100%]' : ''}`
                      }
                      value={
                        (displayType === DisplayType.BetAmount ? item?.amount : item?.totalBet) ||
                        ''
                      }
                      onValueChange={(e) => item?.onChange(+e?.value || 0)}
                      thousandSeparator
                      disabled={disableBet}
                      placeholder="0"
                    />
                    <img
                      className="ml-[16px] inline-block w-[36px]"
                      src="/assets/game/ic-coin.svg"
                      alt=""
                    />
                  </div>
                  {displayType === DisplayType.BetAmount && !item?.amount && (
                    <img
                      className="absolute bottom-0 right-0 inline-block w-[46px] translate-x-[75%]"
                      src="/assets/game/tick.png"
                      alt=""
                    />
                  )}
                  {displayType === DisplayType.BetAmount && !!item?.amount && (
                    <img
                      className="absolute bottom-0 right-0 inline-block w-[46px] translate-x-[75%]"
                      src="/assets/game/tick-active.png"
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <img
            className="absolute top-[55%] left-0 translate-y-[-50%] translate-x-[-140%] w-[44px] transition-all hover:scale-[1.02] active:scale-[1] cursor-pointer"
            src="/assets/game/ic-arrow-left.svg"
            alt=""
            onClick={() => handleChangeDisplayType('prev')}
          />
          <img
            className="absolute top-[55%] right-0 translate-y-[-50%] scale-x-[-1] translate-x-[140%] w-[44px] transition-all hover:scale-y-[1.02] hover:scale-x-[-1.02] active:scale-x-[-1] active:scale-y-[1] cursor-pointer"
            src="/assets/game/ic-arrow-left.svg"
            alt=""
            onClick={() => handleChangeDisplayType('next')}
          />
        </div>
        <div className="w-[35%] max-w-[356px]">
          <p className="mt-[40px] text-left text-[17px]">Time to next race</p>
          <div className="mt-[12px] flex h-[64px] items-center justify-center border border-black bg-[#FFC815]">
            <img className="w-[54px]" src="/assets/game/ic-clock.svg" alt="" />
            <p className="ml-[8px] text-[48px]">{displayedTime()}</p>
          </div>
          <img
            className={`animate-move-down-up mx-auto mt-[32px] max-w-[337px] cursor-pointer ${
              disableBet && 'opacity-70'
            }`}
            src="/assets/game/button-bet.png"
            alt=""
            onClick={onBet}
          />
          <Link
            href="/how-to-play"
            className="mt-[4px] block text-center uppercase underline underline-offset-2"
          >
            How to play
          </Link>
        </div>
      </div>
    </>
  )
}
