import { useEffect, useRef } from 'react'
import classes from './SuperMarioKart.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(classes)

export const SuperMarioKart = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bowserRef = useRef<HTMLDivElement>(null)
  const dkRef = useRef<HTMLDivElement>(null)
  const goombaRef = useRef<HTMLDivElement>(null)
  const luigiRef = useRef<HTMLDivElement>(null)
  const marioRef = useRef<HTMLDivElement>(null)
  const peachRef = useRef<HTMLDivElement>(null)
  const toadRef = useRef<HTMLDivElement>(null)
  const yochiRef = useRef<HTMLDivElement>(null)

  const raceStatus = useRef([
    { ref: bowserRef, speed: 4 },
    { ref: dkRef, speed: 9 },
    { ref: goombaRef, speed: 16 },
    { ref: luigiRef, speed: 7 },
    { ref: marioRef, speed: 6 },
    { ref: peachRef, speed: 5 },
    { ref: toadRef, speed: 4 },
    { ref: yochiRef, speed: 14 },
  ])

  useEffect(() => {
    console.log(containerRef)
    function animate() {
      if (!containerRef.current) {
        // window.requestAnimationFrame(animate)
        return
      }
      for (const p of raceStatus.current) {
        if (!p.ref.current) {
          continue
        }
        const containerWidth = containerRef.current.offsetWidth
        const left = p.ref.current.offsetLeft
        if (left - containerWidth > 200) {
          p.ref.current.style.transitionDuration = '0ms'
          p.ref.current.style.left = '-300px'
        } else {
          const distance = p.speed
          p.ref.current.style.transitionDuration = '150ms'
          p.ref.current.style.left = left + distance + 'px'
        }
        // console.log(p.ref)
      }

      // window.requestAnimationFrame(animate)
    }
    // window.requestAnimationFrame(animate)
    const interval = setInterval(animate, 150)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={containerRef} className={cx('background', 'relative h-full w-full overflow-hidden')}>
      <div
        ref={bowserRef}
        className={cx(
          'bowser',
          'running',
          'absolute left-[-300px] bottom-[86px] h-[93px] w-[100px] transition-all ease-linear'
        )}
      />
      <div
        ref={dkRef}
        className={cx(
          'dk',
          'running',
          'absolute left-[-300px] bottom-[42px] h-[93px] w-[100px] transition-all ease-linear'
        )}
      />
      <div
        ref={goombaRef}
        className={cx(
          'goomba',
          'running',
          'absolute left-[-300px] bottom-[75px] h-[93px] w-[100px] transition-all ease-linear'
        )}
      />
      <div
        ref={luigiRef}
        className={cx(
          'luigi',
          'running',
          'absolute left-[-300px] bottom-[108px] h-[93px] w-[100px] transition-all ease-linear'
        )}
      />
      <div
        ref={marioRef}
        className={cx(
          'mario',
          'running',
          'absolute left-[-300px] bottom-[97px] h-[93px] w-[100px] transition-all ease-linear'
        )}
      />
      <div
        ref={peachRef}
        className={cx(
          'peach',
          'running',
          'absolute left-[-300px] bottom-[64px] h-[93px] w-[100px] transition-all ease-linear'
        )}
      />
      <div
        ref={toadRef}
        className={cx(
          'toad',
          'running',
          'absolute left-[-300px] bottom-[32px] h-[93px] w-[100px] transition-all ease-linear'
        )}
      />
      <div
        ref={yochiRef}
        className={cx(
          'yoshi',
          'running',
          'absolute left-[-300px] bottom-[53px] h-[93px] w-[100px] transition-all ease-linear'
        )}
      />
    </div>
  )
}
