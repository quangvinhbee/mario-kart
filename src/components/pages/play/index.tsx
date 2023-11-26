import { useRouter } from 'next/router'
import { useState } from 'react'
import { CountdownBet } from './CountdownBet'
import { Race } from './Race'

export enum RaceStatus {
  Bet,
  RaceWaiting,
  RaceRunning,
  // RaceEnded,
}

const winRacerIndex = Math.floor(Math.random() * 3)

console.log('winRacerIndex', winRacerIndex)

export const PlayPage = () => {
  const [statusActive, setStatusActive] = useState(RaceStatus.Bet)
  const router = useRouter()

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
