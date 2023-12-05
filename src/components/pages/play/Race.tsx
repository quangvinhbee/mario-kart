import { Background } from '@/components/common/RacePreview/Background'
import { useMarioKart } from '@/providers/game-provider'
import classNames from 'classnames/bind'
import { Reorder } from 'framer-motion'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { RaceStatus } from '.'
import classes from './SuperMarioKart.module.scss'

const cx = classNames.bind(classes)

interface RaceProps {
  raceStatus?: RaceStatus
  winRacerIndexRef?: MutableRefObject<number>
  onEndRace?: VoidFunction
}

export const Race: FC<RaceProps> = (props) => {
  const { betHandler, yourBet, currentGame } = useMarioKart()

  const TOTAL_TIME = (currentGame?.endAt - new Date().getTime()) / 1000 + 30
  const TIME_INTERVAL = 200
  const TOTAL_STEP = Math.round(TOTAL_TIME * (1000 / TIME_INTERVAL))

  console.log({ betHandler, yourBet, currentGame, TOTAL_TIME })

  const { raceStatus, winRacerIndexRef, onEndRace } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRemaining = useRef<number>(TOTAL_STEP)
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_TIME)

  const racers = useRef([
    { name: 'mario', ref: useRef<HTMLDivElement>(null), bottom: 120 },
    { name: 'yoshi', ref: useRef<HTMLDivElement>(null), bottom: 90 },
    { name: 'bowser', ref: useRef<HTMLDivElement>(null), bottom: 60 },
    { name: 'toad', ref: useRef<HTMLDivElement>(null), bottom: 30 },
  ])

  const [racerPosition, setRacePosition] = useState([
    { name: 'mario', frameImage: '/assets/game/frame-mario.png', position: 0 },
    { name: 'yoshi', frameImage: '/assets/game/frame-yoshi.png', position: 0 },
    { name: 'bowser', frameImage: '/assets/game/frame-bower.png', position: 0 },
    { name: 'toad', frameImage: '/assets/game/frame-toad.png', position: 0 },
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

        if (stepRemaining.current > 0) {
          const random = Math.random()
          let percentTransition = (((95 - percent) * 1.15) / stepRemaining.current) * random
          if (stepRemaining.current < 5) {
            if (i === winRacerIndexRef.current) {
              percentTransition = (100 - percent) / stepRemaining.current
            }
          }
          const distance = Math.round((containerWidth / 100) * percentTransition)
          el.style.transitionDuration = TIME_INTERVAL + 'ms'
          el.style.left = left + distance + 'px'
        } else {
          const distance = 100
          el.style.transitionDuration = TIME_INTERVAL + 'ms'
          el.style.left = left + distance + 'px'
        }
      }

      // const position = racerPosition?.map((item) => ({
      //   ...item,
      //   position: racers.current
      //     ?.find((race) => race?.name === item?.name)
      //     ?.ref?.current?.getBoundingClientRect().x,
      // }))
      // position.sort((a, b) => b?.position - a?.position)
      // setRacePosition(position)

      if (raceStatus === RaceStatus.RaceRunning && stepRemaining.current > 0) {
        containerRef.current.style.transitionDuration = TIME_INTERVAL + 'ms'
        containerRef.current.style.left =
          -(containerWidth - window.innerWidth + 50) * (1 - stepRemaining.current / TOTAL_STEP) +
          'px'
      }
      if (stepRemaining.current === 0) {
        onEndRace && onEndRace()
      }
      stepRemaining.current -= 1
      setTimeRemaining(Math.max(0, Math.round((stepRemaining.current / TOTAL_STEP) * TOTAL_TIME)))
    }
    if (raceStatus !== RaceStatus.RaceWaiting) {
      interval = setInterval(animate, TIME_INTERVAL)
    }
    return () => {
      clearInterval(interval)
    }
  }, [raceStatus])

  return (
    <Background>
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] text-[80px]">
          {timeRemaining}
        </div>
        <div className="absolute top-[100px] left-[40px] w-[260px]">
          <Reorder.Group axis="y" values={racerPosition} onReorder={setRacePosition}>
            {racerPosition?.map((item, i) => (
              <Reorder.Item key={item?.name} value={item?.name}>
                <div className="mb-[16px]" key={i + Math.random()}>
                  <div className="flex justify-between">
                    <p className="text-[14px]">{item?.name}</p>
                    <p className="text-[14px]">Your Bet</p>
                  </div>
                  <div className="flex justify-between">
                    <img className="w-[24%]" src={item?.frameImage} alt="" />
                    <div className="relative w-[74%]">
                      <img
                        className="aspect-[257/93] w-full"
                        src="/assets/game/frame-input.png"
                        alt=""
                      />
                      <div className="absolute inset-x-[12%] inset-y-[18%] flex items-center">
                        <NumericFormat
                          displayType="text"
                          className={
                            'w-[calc(100%-36px-16px)] text-right font-retro text-[20px] outline-none placeholder:text-black'
                          }
                          value={0}
                          thousandSeparator
                        />
                        <img
                          className="ml-[16px] inline-block w-[36px]"
                          src="/assets/game/ic-coin.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div
          ref={containerRef}
          className="relative h-full w-[3000px] transition-all duration-1000 ease-linear"
        >
          <div className="bg-[size:100%] absolute bottom-0 right-[120px] h-[164px] w-[20px] bg-[url(/assets/game/goal.png)]"></div>
          {racers.current.map((item, i) => (
            <div
              ref={item.ref}
              className={cx(
                item?.name,
                'absolute left-[2%] h-[93px] w-[100px] cursor-pointer transition-all ease-[cubic-bezier(0.63,0.46,0.61,0.76)]'
              )}
              style={{
                bottom: item?.bottom + 'px',
              }}
            />
          ))}
        </div>
      </div>
    </Background>
  )
}
