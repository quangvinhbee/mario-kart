import { useMarioKart } from '@/providers/game-provider'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CountdownBet } from './CountdownBet'
import { Race } from './Race'

export enum RaceStatus {
  Bet,
  RaceWaiting,
  RaceRunning,
  // RaceEnded,
}

export const PlayPage = () => {
  const [statusActive, setStatusActive] = useState(RaceStatus.Bet)
  const router = useRouter()
  const [winRacerIndex, setWinRacerIndex] = useState(0)
  const { betHandler, currentGame, userBalance } = useMarioKart()

  useEffect(() => {
    if (Number(currentGame?.endAt) < new Date().getTime()) {
      setStatusActive(RaceStatus.RaceRunning)
    } else {
      setStatusActive(RaceStatus.Bet)
    }
    if (currentGame?.result) {
      const CHARACTER = ['MARIO', 'BOWER', 'YOSHI', 'TOAD']
      console.log(currentGame?.result, CHARACTER.indexOf(currentGame?.result))
      setWinRacerIndex(CHARACTER.indexOf(currentGame?.result))
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
