import { useMarioKart } from '@/providers/game-provider'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

export const MarketplacePage = () => {
  const { address } = useAccount()
  const { depositHandler, userBalance, refreshBalance, depositLoad, withdrawHandler } =
    useMarioKart()

  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)

  useEffect(() => {}, [address])

  return (
    <div className="max-w-[1000px] mx-auto h-full flex flex-col">
      <div className="flex items-center space-x-[16px]">
        <div className="aspect-[97/20] flex justify-between items-center w-[97px] bg-[url(/assets/game/button-bg-gray.svg)] bg-no-repeat bg-center px-[12px] cursor-pointer bg-contain">
          <p className="text-[12px]">Level</p>
          <img className="w-[10px]" src="/assets/game/triange-pixel.svg" alt="" />
        </div>
        <div className="aspect-[97/20] flex justify-between items-center w-[97px] bg-[url(/assets/game/button-bg-gray.svg)] bg-no-repeat bg-center px-[12px] cursor-pointer bg-contain">
          <p className="text-[12px]">Price</p>
          <img className="w-[10px]" src="/assets/game/triange-pixel.svg" alt="" />
        </div>
        <div className="aspect-[97/20] flex justify-between items-center w-[97px] bg-[url(/assets/game/button-bg-gray.svg)] bg-no-repeat bg-center px-[12px] cursor-pointer bg-contain">
          <p className="text-[12px]">Type</p>
          <img className="w-[10px]" src="/assets/game/triange-pixel.svg" alt="" />
        </div>
        <div className="aspect-[97/20] flex justify-between items-center w-[97px] bg-[url(/assets/game/button-bg-gray.svg)] bg-no-repeat bg-center px-[12px] cursor-pointer bg-contain">
          <p className="text-[12px]">Kinds</p>
          <img className="w-[10px]" src="/assets/game/triange-pixel.svg" alt="" />
        </div>
        <div className="w-[calc(100%-97px*4-16px*3)] text-[12px] leading-[1.15]">
          Note:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.{' '}
        </div>
      </div>
      <div className="flex-grow pt-[20px]">
        <div className="flex flex-wrap justify-between"></div>
      </div>
    </div>
  )
}
