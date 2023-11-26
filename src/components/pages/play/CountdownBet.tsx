import { RacePreview } from '@/components/common/RacePreview'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

interface CountdownBetProps {
  onBet?: VoidFunction
}

export const CountdownBet = (props: CountdownBetProps) => {
  const { onBet } = props

  const [betMarioAmount, setBetMarioAmount] = useState(0)
  const [betYoshiAmount, setBetYoshiAmount] = useState(0)
  const [betBowerAmount, setBetBowerAmount] = useState(0)
  const [betToadAmount, setBetToadAmount] = useState(0)
  const [secondsRemaining, setSecondsRemaining] = useState(0)

  const endDate = '2023-11-28T14:48:00.000Z'

  const betPlaces = [
    {
      name: 'mario',
      frameImage: '/assets/game/frame-mario.png',
      amount: betMarioAmount,
      onChange: setBetMarioAmount,
    },
    {
      name: 'yoshi',
      frameImage: '/assets/game/frame-yoshi.png',
      amount: betYoshiAmount,
      onChange: setBetYoshiAmount,
    },
    {
      name: 'bower',
      frameImage: '/assets/game/frame-bower.png',
      amount: betBowerAmount,
      onChange: setBetBowerAmount,
    },
    {
      name: 'toad',
      frameImage: '/assets/game/frame-toad.png',
      amount: betToadAmount,
      onChange: setBetToadAmount,
    },
  ]

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

  useEffect(() => {
    const interval = setInterval(() => {
      const s = (new Date(endDate).valueOf() - Date.now()) / 1000
      setSecondsRemaining(Math.max(Math.round(s), 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="container relative flex w-full flex-wrap items-center justify-between px-[16px] pt-[100px]">
        <div className="mx-auto flex w-[60%] max-w-[760px] flex-wrap justify-between pt-[52px]">
          {betPlaces?.map((item, i) => (
            <div className="mb-[32px] w-[45%]" key={i}>
              <div className="flex justify-between">
                <p className="text-[14px]">{item?.name}</p>
                <p>Bet amount</p>
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
                      className="h-[100%] w-[calc(100%-36px-16px)] text-right font-retro text-[20px] outline-none placeholder:text-black"
                      value={item?.amount || ''}
                      onValueChange={(e) => item?.onChange(+e?.value || 0)}
                      thousandSeparator
                      placeholder="0"
                    />
                    <img
                      className="ml-[16px] inline-block w-[36px]"
                      src="/assets/game/ic-coin.svg"
                      alt=""
                    />
                  </div>
                  {!item?.amount && (
                    <img
                      className="absolute bottom-0 right-0 inline-block w-[46px] translate-x-[75%]"
                      src="/assets/game/tick.png"
                      alt=""
                    />
                  )}
                  {!!item?.amount && (
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
        </div>
        <div className="mx-auto w-[35%] max-w-[356px]">
          <div className="flex items-center justify-end">
            <NumericFormat
              displayType="text"
              className="text-[24px]"
              value={12345678}
              thousandSeparator
            />
            <img
              className="ml-[16px] inline-block w-[36px]"
              src="/assets/game/ic-coin.svg"
              alt=""
            />
          </div>
          <p className="mt-[40px] text-left text-[17px]">Time to next race</p>
          <div className="mt-[12px] flex h-[64px] items-center justify-center border border-black bg-[#FFC815]">
            <img className="w-[54px]" src="/assets/game/ic-clock.svg" alt="" />
            <p className="ml-[8px] text-[48px]">{displayedTime()}</p>
          </div>
          <img
            className="animate-move-down-up mx-auto mt-[32px] max-w-[337px] cursor-pointer"
            src="/assets/game/button-bet.png"
            alt=""
            onClick={onBet}
          />
          <Link href="/how-to-play">
            <a className="mt-[4px] block text-center uppercase underline underline-offset-2">
              How to play
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
