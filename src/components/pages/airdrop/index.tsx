import { useMarioKart } from '@/providers/game-provider'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

export const AirdropPage = () => {
  const { address } = useAccount()
  const { depositHandler, userBalance, refreshBalance, depositLoad, withdrawHandler } =
    useMarioKart()

  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)

  useEffect(() => {}, [address])

  return <></>
}
