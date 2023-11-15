import { updateOpenSoundSetting } from '@/redux/common/setting'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { PreviewTitle } from './PreviewTitle'
import { Race } from './Race'
import classes from './SuperMarioKart.module.scss'

const cx = classNames.bind(classes)

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

const winRacerIndex = Math.floor(Math.random() * 3)

console.log('winRacerIndex', winRacerIndex)

export const SuperMarioKart = () => {
  const openSound = useSelector((store: any) => store?.SettingCommonSlice.openSound)
  const dispatch = useDispatch()
  const [activeScreen, setActiveScreen] = useState(RaceStatus.Preview)
  const containerRef = useRef<HTMLDivElement>(null)
  const bgmRef = useRef<HTMLAudioElement>(null)
  const clickCharacterEffectRef = useRef<HTMLAudioElement>(null)
  const clickBgEffectRef = useRef<HTMLAudioElement>(null)

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(updateOpenSoundSetting(!openSound))
  }

  const handleStart = () => {
    // setActiveScreen(RaceStatus.RaceWaiting)
    setActiveScreen(RaceStatus.RaceRunning)
  }

  const handleStartRace = () => {
    setActiveScreen(RaceStatus.RaceRunning)
  }

  const handleEndRace = () => {
    setActiveScreen(RaceStatus.RaceEnded)
  }

  useEffect(() => {
    if (bgmRef.current) {
      if (openSound) {
        bgmRef.current.play()
      } else {
        bgmRef.current.pause()
      }
    }
  }, [openSound])

  useEffect(() => {
    bgmRef.current = new Audio('/assets/super-mario-kart/IGN-presents-Museum-of-Mario.mp3')
    clickCharacterEffectRef.current = new Audio('/assets/super-mario-kart/powerup5.wav')
    clickBgEffectRef.current = new Audio('/assets/super-mario-kart/Hit_Hurt19.wav')

    if (openSound) {
      bgmRef.current.play()
    }

    bgmRef.current.addEventListener('ended', () => bgmRef.current.play())
    return () => {
      bgmRef.current.removeEventListener('ended', () => bgmRef.current.play())
      bgmRef.current.pause()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cx(
        'background',
        [RaceStatus.Preview, RaceStatus.RaceRunning].includes(activeScreen)
          ? 'background-running'
          : '',
        'relative h-full w-full overflow-hidden'
      )}
    >
      {activeScreen === RaceStatus.Preview && (
        <PreviewTitle containerRef={containerRef} onStart={handleStart} />
      )}
      {[RaceStatus.RaceWaiting, RaceStatus.RaceRunning, RaceStatus.RaceEnded].includes(
        activeScreen
      ) && (
        <Race raceStatus={activeScreen} winRacerIndex={winRacerIndex} onEndRace={handleEndRace} />
      )}
      {activeScreen === RaceStatus.RaceEnded && (
        <div className="top-30px absolute left-0 top-[70px] w-full text-center font-arcade text-[50px] font-semibold">
          {winRacerIndex} WON
        </div>
      )}

      <div
        className="absolute bottom-[16px] right-[16px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center bg-orange-600"
        onClick={handleToggleSound}
      >
        {openSound ? (
          <BsFillVolumeUpFill className="text-[24px] text-white" />
        ) : (
          <BsFillVolumeMuteFill className="text-[24px] text-white" />
        )}
      </div>
    </div>
  )
}
