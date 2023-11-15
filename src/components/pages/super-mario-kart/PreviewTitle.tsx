import classNames from 'classnames/bind'
import { FC, MutableRefObject, useEffect, useRef } from 'react'
import classes from './SuperMarioKart.module.scss'

const cx = classNames.bind(classes)

interface PreviewTitleProps {
  containerRef: MutableRefObject<HTMLDivElement>
  onStart: VoidFunction
}

export const PreviewTitle: FC<PreviewTitleProps> = (props) => {
  const { containerRef, onStart } = props
  const bowserRef = useRef<HTMLDivElement>(null)
  const dkRef = useRef<HTMLDivElement>(null)
  const goombaRef = useRef<HTMLDivElement>(null)
  const luigiRef = useRef<HTMLDivElement>(null)
  const marioRef = useRef<HTMLDivElement>(null)
  const peachRef = useRef<HTMLDivElement>(null)
  const toadRef = useRef<HTMLDivElement>(null)
  const yochiRef = useRef<HTMLDivElement>(null)
  const clickCharacterEffectRef = useRef<HTMLAudioElement>(null)

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
    clickCharacterEffectRef.current = new Audio('/assets/super-mario-kart/powerup5.wav')
  }, [])

  return (
    <>
      <div className="absolute top-[150px] left-[50%] translate-x-[-50%]">
        <img
          className="w-[200px] animate-bounce cursor-pointer"
          src="/assets/super-mario-kart/button-start.png"
          alt=""
          onClick={() => onStart && onStart()}
        />
      </div>
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
    </>
  )
}
