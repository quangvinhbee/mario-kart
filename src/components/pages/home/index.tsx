import { RacePreview } from '@/components/common/RacePreview'
import { updateOpenSoundSetting } from '@/redux/common/setting'
import { useWeb3Modal } from '@web3modal/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from 'wagmi'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

const winRacerIndex = Math.floor(Math.random() * 3)

console.log('winRacerIndex', winRacerIndex)

export const HomePage = () => {
  const openSound = useSelector((store: any) => store?.SettingCommonSlice.openSound)
  const END_POINT = process.env.NEXT_PUBLIC_API_URL
  const dispatch = useDispatch()
  const { open } = useWeb3Modal()
  const { address } = useAccount()
  const [activeScreen, setActiveScreen] = useState(RaceStatus.Preview)
  const containerRef = useRef<HTMLDivElement>(null)
  const bgmRef = useRef<HTMLAudioElement>(null)
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

  const getLogin = () => {
    try {
    } catch (e) {
      console.log(e.message)
    }
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

  useEffect(() => {}, [address])

  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="pointer-events-none relative w-full pt-[80px]">
        <div className="max-w-[645px] mx-auto">
          <Image className="" src="/assets/game/banner.png" alt="" width={646} height={432} />
          <div className="pointer-events-auto translate-y-[-100%]">
            <Link href="/play">
              <img className="cursor-pointer mx-auto max-w-[337px] w-full" src="/assets/game/button-play.png" alt="" />
            </Link>
            <Link href="/help">
              <a className="mt-[4px] block text-center uppercase underline underline-offset-2">
                How to play
              </a>
            </Link>
          </div>
        </div>
        <div className="pointer-events-auto absolute left-[64px] top-[120px] space-y-[24px]">
          <Link href={'#'}>
            <a className="flex items-center space-x-[8px] cursor-pointer" target="_blank">
              <img className="w-[32px]" src="/assets/game/ic-arrow-right.png" alt="" />
              <p className="uppercase">buy token</p>
            </a>
          </Link>
          <Link href={'#'}>
            <a className="flex items-center space-x-[8px] cursor-pointer" target="_blank">
              <img className="w-[32px]" src="/assets/game/ic-arrow-right.png" alt="" />
              <p className="uppercase">view chart</p>
            </a>
          </Link>
          <Link href={'#'}>
            <a className="flex items-center space-x-[8px] cursor-pointer" target="_blank">
              <img className="w-[32px]" src="/assets/game/ic-arrow-right.png" alt="" />
              <p className="uppercase">coinmarketcap</p>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
