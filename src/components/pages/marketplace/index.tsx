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
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center space-x-[16px]"></div>
    </div>
  )
}
