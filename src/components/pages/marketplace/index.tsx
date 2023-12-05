import { useMarioKart } from '@/providers/game-provider'
import { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useAccount } from 'wagmi'
import { characterImage } from '../spin-race'

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
    <div className="max-w-[1000px] mx-auto flex flex-col">
      <div className="flex items-center space-x-[16px] h-[52px]">
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
      <div className="flex-grow pt-[20px] h-[calc(100vh-120px-52px)]">
        <div className="h-full flex flex-wrap justify-between overflow-y-auto pr-[20px]">
          {[...Array(50)].map((item, i) => (
            <div className="w-[17%] mb-[5%]" key={i}>
              <p className="text-right text-[25px]">#{100 + i}</p>
              <div className="relative aspect-1 mt-[4px]">
                <img className="w-full" src="/assets/game/frame-character.svg" alt="" />
                <img
                  className="absolute w-[50%] top-[25%] left-[25%]"
                  src={characterImage['mario']}
                  alt=""
                />
              </div>
              <div className="text-[15px] flex items-center justify-between mt-[8px]">
                Price:&nbsp;
                <NumericFormat
                  displayType="text"
                  className="text-[#BDBDBD] text-[15px] font-retro flex-grow"
                  value={0}
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator
                />
                <img className="w-[22px]" src="/assets/game/ic-coin.svg" alt="" />
              </div>
              <div>
                <button
                  disabled={true}
                  className="block aspect-[223/72] w-[108px] mx-auto mt-[12px] bg-[url(/assets/game/button-green.svg)] bg-no-repeat bg-contain text-[12px] font-retro cursor-pointer transition-all active:translate-y-[2px] disabled:opacity-60 disabled:active:translate-y-0"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
