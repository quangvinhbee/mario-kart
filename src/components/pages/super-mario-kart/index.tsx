import { updateOpenSoundSetting } from '@/redux/common/setting'
import classNames from 'classnames/bind'
import { useEffect, useRef } from 'react'
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import classes from './SuperMarioKart.module.scss'

const cx = classNames.bind(classes)

export const SuperMarioKart = () => {
  const openSound = useSelector((store: any) => store?.SettingCommonSlice.openSound)
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const bowserRef = useRef<HTMLDivElement>(null)
  const dkRef = useRef<HTMLDivElement>(null)
  const goombaRef = useRef<HTMLDivElement>(null)
  const luigiRef = useRef<HTMLDivElement>(null)
  const marioRef = useRef<HTMLDivElement>(null)
  const peachRef = useRef<HTMLDivElement>(null)
  const toadRef = useRef<HTMLDivElement>(null)
  const yochiRef = useRef<HTMLDivElement>(null)
  const bgmRef = useRef<HTMLAudioElement>(null)
  const clickCharacterEffectRef = useRef<HTMLAudioElement>(null)
  const clickBgEffectRef = useRef<HTMLAudioElement>(null)

  const raceStatus = useRef([
    { name: 'luigi', ref: luigiRef, speed: 7, bottom: 108 },
    { name: 'mario', ref: marioRef, speed: 6, bottom: 97 },
    { name: 'bowser', ref: bowserRef, speed: 4, bottom: 86 },
    { name: 'goomba', ref: goombaRef, speed: 16, bottom: 75 },
    { name: 'peach', ref: peachRef, speed: 5, bottom: 64 },
    { name: 'yoshi', ref: yochiRef, speed: 14, bottom: 53 },
    { name: 'dk', ref: dkRef, speed: 9, bottom: 42 },
    { name: 'toad', ref: toadRef, speed: 4, bottom: 32 },
  ])

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(updateOpenSoundSetting(!openSound))
  }

  const handleClickCharacter = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    e.persist()
    clickCharacterEffectRef.current.play()
    if (raceStatus.current[index]) {
      const el = raceStatus.current[index].ref.current
      el.classList.remove(cx('running'))
      el.classList.add(cx('spin'))
    }
  }

  useEffect(() => {
    function animate() {
      if (!containerRef.current) {
        return
      }
      for (const p of raceStatus.current) {
        if (!p.ref.current) {
          continue
        }
        const containerWidth = containerRef.current.offsetWidth
        const el = p.ref.current
        const left = el.offsetLeft
        if (left < -400) {
          el.classList.remove(cx('spin'))
          el.classList.add(cx('running'))
        }
        const isRunning = el.classList.contains(cx('running'))
        if (isRunning) {
          if (left - containerWidth > 200) {
            el.style.transitionDuration = '0ms'
            el.style.left = '-300px'
          } else {
            const distance = p.speed
            el.style.transitionDuration = '150ms'
            el.style.left = left + distance + 'px'
          }
        } else {
          el.style.left = left - 30 + 'px'
        }
      }
    }
    const interval = setInterval(animate, 150)
    return () => {
      clearInterval(interval)
    }
  }, [])

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
      className={cx('background', 'relative h-full w-full overflow-hidden')}
      onClick={() => clickBgEffectRef.current.play()}
    >
      {raceStatus.current.map((item, i) => (
        <div
          ref={item.ref}
          className={cx(
            item?.name,
            'running',
            'absolute left-[-300px] h-[93px] w-[100px] cursor-pointer transition-all ease-linear'
          )}
          style={{
            bottom: item?.bottom + 'px',
          }}
          onClick={(e) => handleClickCharacter(i, e)}
        />
      ))}
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
