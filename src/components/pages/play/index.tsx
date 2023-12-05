import { useMarioKart } from '@/providers/game-provider'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
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
  const winRacerIndexRef = useRef(0)
  const { betHandler, currentGame, userBalance } = useMarioKart()

  useEffect(() => {
    if (Number(currentGame?.endAt) < new Date().getTime()) {
      setStatusActive(RaceStatus.RaceRunning)
    } else {
      setStatusActive(RaceStatus.Bet)
    }
    if (currentGame?.result) {
      const CHARACTER = ['MARIO', 'YOSHI', 'BOWER', 'TOAD']
      console.log(currentGame?.result, CHARACTER.indexOf(currentGame?.result))
      winRacerIndexRef.current = CHARACTER.indexOf(currentGame?.result)
    }
  }, [currentGame])

  if (statusActive === RaceStatus.Bet) {
    return <CountdownBet onBet={() => setStatusActive(RaceStatus.RaceRunning)} />
  }

  return (
    <Race
      raceStatus={statusActive}
      winRacerIndexRef={winRacerIndexRef}
      onEndRace={() => {
        router.push('/reward')
      }}
    />
  )
}
