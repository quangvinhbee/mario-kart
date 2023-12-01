import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CountdownBet } from './CountdownBet'
import { Race } from './Race'
import { useMarioKart } from '@/providers/game-provider'

export enum RaceStatus {
  Bet,
  RaceWaiting,
  RaceRunning,
  // RaceEnded,
}

const winRacerIndex = 4

export const PlayPage = () => {
  const [statusActive, setStatusActive] = useState(RaceStatus.Bet)
  const router = useRouter()
  const { betHandler, currentGame, userBalance } = useMarioKart()

  useEffect(() => {
    if (Number(currentGame?.endAt || 0) < new Date().getTime()) {
      setStatusActive(RaceStatus.RaceRunning)
    } else {
      setStatusActive(RaceStatus.Bet)
    }
  }, [currentGame])

  if (statusActive === RaceStatus.Bet) {
    return <CountdownBet onBet={() => setStatusActive(RaceStatus.RaceRunning)} />
  }

  return (
    <Race
      raceStatus={statusActive}
      winRacerIndex={winRacerIndex}
      onEndRace={() => {
        router.push('/reward')
      }}
    />
  )
}
