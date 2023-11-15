import classNames from 'classnames/bind'
import { FC, useEffect, useRef } from 'react'
import { RaceStatus } from '.'
import classes from './SuperMarioKart.module.scss'

const cx = classNames.bind(classes)

interface RaceProps {
  raceStatus?: RaceStatus
  winRacerIndex?: number
  onEndRace?: VoidFunction
}

const TOTAL_TIME = 12
const TIME_INTERVAL = 200
const TOTAL_STEP = Math.round(TOTAL_TIME * (1000 / TIME_INTERVAL))

export const Race: FC<RaceProps> = (props) => {
  const { raceStatus, winRacerIndex, onEndRace } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const timeRemaining = useRef<number>(TOTAL_STEP)

  const racers = useRef([
    { name: 'bowser', ref: useRef<HTMLDivElement>(null), bottom: 150 },
    { name: 'goomba', ref: useRef<HTMLDivElement>(null), bottom: 120 },
    { name: 'yoshi', ref: useRef<HTMLDivElement>(null), bottom: 90 },
    { name: 'toad', ref: useRef<HTMLDivElement>(null), bottom: 60 },
  ])

  useEffect(() => {
    let interval: NodeJS.Timer
    function animate() {
      if (!containerRef.current) {
        return
      }
      const containerWidth = containerRef.current.offsetWidth
      for (let i = 0; i < racers?.current?.length; i++) {
        const pRef = racers.current[i]?.ref
        if (!pRef.current) {
          continue
        }
        const el = pRef.current
        const left = +el.style.left.replace('px', '')
        const percent = (left / containerWidth) * 100

        if (timeRemaining.current > 0) {
          const random = Math.random()
          let percentTransition = (((95 - percent) * 1.2) / timeRemaining.current) * random
          if (timeRemaining.current < 5) {
            if (i === winRacerIndex) {
              percentTransition = (100 - percent) / timeRemaining.current
            }
          }
          const distance = Math.round((containerWidth / 100) * percentTransition)
          console.log(racers.current[i].name, left, percentTransition, distance)
          el.style.transitionDuration = TIME_INTERVAL + 'ms'
          el.style.left = left + distance + 'px'
        } else {
          const distance = 100
          el.style.transitionDuration = TIME_INTERVAL + 'ms'
          el.style.left = left + distance + 'px'
        }
      }
      if (raceStatus === RaceStatus.RaceRunning && timeRemaining.current > 0) {
        containerRef.current.style.transitionDuration = TIME_INTERVAL + 'ms'
        console.log(
          containerRef.current.offsetLeft,
          containerWidth - window.innerWidth + 50,
          1 - timeRemaining.current / TOTAL_STEP,
          -(containerWidth - window.innerWidth + 50) * (1 - timeRemaining.current / TOTAL_STEP) +
            'px'
        )
        containerRef.current.style.left =
          -(containerWidth - window.innerWidth + 50) * (1 - timeRemaining.current / TOTAL_STEP) +
          'px'
      }
      if (timeRemaining.current === 0) {
        onEndRace && onEndRace()
      }
      timeRemaining.current -= 1
    }
    if (raceStatus !== RaceStatus.RaceWaiting) {
      interval = setInterval(animate, TIME_INTERVAL)
    }
    return () => {
      clearInterval(interval)
    }
  }, [raceStatus])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-[3000px] transition-all duration-1000 ease-linear"
    >
      <div className="absolute bottom-0 right-[120px] h-[30%] w-[2px] bg-red-600"></div>
      {racers.current.map((item, i) => (
        <div
          ref={item.ref}
          className={cx(
            item?.name,
            raceStatus === RaceStatus.RaceWaiting ? '' : 'running',
            'absolute left-[2%] h-[93px] w-[100px] cursor-pointer transition-all ease-[cubic-bezier(0.24,0.07,0.78,1)]'
          )}
          style={{
            bottom: item?.bottom + 'px',
          }}
        />
      ))}
    </div>
  )
}
