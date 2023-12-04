import { RacePreview } from '@/components/common/RacePreview'
import { useMarioKart } from '@/providers/game-provider'
import { AppState } from '@/redux/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useSelector } from 'react-redux'

export const RewardPage = () => {
  const [reward, setReward] = useState(0)
  const [winnerImage, setWinnerImage] = useState('')
  const { userBalance, refreshBalance, currentGame, yourBet } = useMarioKart()
  const router = useRouter()

  const getReward = async (RESULT: any) => {
    try {
      let rate = 0
      switch (RESULT) {
        case 'MARIO':
          if (Number(yourBet.mario.amount) > 0) {
            rate =
              (Number(currentGame.totalBet) - Number(currentGame.totalMario)) /
                Number(currentGame.totalMario) || 0
            console.log(yourBet, rate)
            setReward(Number(yourBet.mario.amount) * (rate + 1))
          }
          break
        case 'BOWER':
          if (Number(yourBet.bower.amount) > 0) {
            rate =
              (Number(currentGame.totalBet) - Number(currentGame.totalBower)) /
                Number(currentGame.totalBower) || 0
            setReward(Number(yourBet.bower.amount) * (rate + 1))
          }

          break
        case 'YOSHI':
          if (Number(yourBet.yoshi.amount) > 0) {
            rate =
              (Number(currentGame.totalBet) - Number(currentGame.totalYoshi)) /
                Number(currentGame.totalYoshi) || 0
            setReward(Number(yourBet.yoshi.amount) * (rate + 1))
          }
          break
        case 'TOAD':
          if (Number(yourBet.toad.amount) > 0) {
            rate =
              (Number(currentGame.totalBet) - Number(currentGame.totalToad)) /
                Number(currentGame.totalToad) || 0
            setReward(Number(yourBet.toad.amount) * (rate + 1))
          }
          break
      }
    } catch (e) {
      console.log(e)
    }
  }

  const racers = [
    { name: 'MARIO', image: '/assets/game/frame-mario-win.png' },
    { name: 'YOSHI', image: '/assets/game/frame-yoshi-win.png' },
    { name: 'BOWER', image: '/assets/game/frame-bower-win.png' },
    { name: 'TOAD', image: '/assets/game/frame-toad-win.png' },
  ]

  useEffect(() => {
    if (currentGame?.result) {
      getReward(currentGame.result)
      const image = racers?.find((item) => item?.name === currentGame?.result)?.image
      setWinnerImage(image)
    }
  }, [currentGame])

  useEffect(() => {
    refreshBalance()
  }, [])

  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="container relative flex w-full flex-wrap items-center justify-between px-[16px] pt-[100px]">
        <div className="flex w-full items-center justify-end">
          <NumericFormat
            displayType="text"
            className="text-[24px]"
            value={Number(userBalance)}
            thousandSeparator
          />
          <img className="ml-[16px] inline-block w-[36px]" src="/assets/game/ic-coin.svg" alt="" />
        </div>
        <div className="w-[40%]">
          <img data-aos="zoom-in" className="mx-auto max-w-[440px]" src={winnerImage} alt="" />
        </div>
        <div className="w-[55%]">
          <p className="text-[24px]">Your rewards</p>
          <div className="mt-[8px] flex items-center space-x-[24px]">
            <div className="relative w-full max-w-[256px]">
              <img className="aspect-[257/93] w-full" src="/assets/game/frame-input.png" alt="" />
              <div className="absolute inset-x-[12%] inset-y-[18%] flex items-center justify-end">
                <NumericFormat
                  displayType="text"
                  className="text-right font-retro text-[24px] outline-none placeholder:text-black"
                  value={Math.round(reward)}
                  thousandSeparator
                />
                <img
                  className="ml-[16px] inline-block w-[36px]"
                  src="/assets/game/ic-coin.svg"
                  alt=""
                />
              </div>
            </div>
            <img
              className="animate-move-down-up mx-auto mt-[32px] max-w-[337px] cursor-pointer"
              src="/assets/game/button-play.png"
              alt=""
              onClick={() => {
                router.push('/play')
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
