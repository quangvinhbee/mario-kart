import { useMarioKart } from '@/providers/game-provider'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { StakeItem } from './StakeItem'

export const StakePage = () => {
  const { address } = useAccount()
  const { depositHandler, userBalance, refreshBalance, depositLoad, withdrawHandler } =
    useMarioKart()

  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)

  useEffect(() => {}, [address])

  return (
    <div className="max-w-[1080px] mx-auto flex flex-col">
      <div className="flex-grow pt-[20px]">
        <div className="h-full flex flex-wrap justify-between overflow-y-auto pr-[20px]">
          {stakes.map((item, i) => (
            <div className="w-[30%]" key={i}>
              <StakeItem stake={item} />
            </div>
          ))}
        </div>
      </div>
      <p className="max-w-[700px] mx-auto text-[12px] mt-[44px]">
        Note:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.{' '}
      </p>
    </div>
  )
}

const stakes = [
  {
    symbol: 'ETH',
    symbolPrefix: '',
    icon: '/assets/game/ic-eth.svg',
    price: 2260,
  },
  {
    symbol: 'Oxrace',
    symbolPrefix: '',
    icon: '/assets/game/ic-coin.svg',
    price: 'N/A',
  },
  {
    symbol: 'Oxrace',
    symbolPrefix: 'ES',
    icon: '/assets/game/ic-cup.svg',
    price: 'N/A',
  },
]
