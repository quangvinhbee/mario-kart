import { updateOpenSoundSetting } from '@/redux/common/setting'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const SoundButton = () => {
  const openSound = useSelector((store: any) => store?.SettingCommonSlice.openSound)
  const dispatch = useDispatch()
  const bgmRef = useRef<HTMLAudioElement>(null)

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(updateOpenSoundSetting(!openSound as any))
  }

  const handleOnSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(updateOpenSoundSetting(true as any))
  }

  const handleOffSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(updateOpenSoundSetting(false as any))
  }

  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio('/assets/super-mario-kart/IGN-presents-Museum-of-Mario.mp3')
    }
    if (openSound) {
      bgmRef.current.play()
    } else {
      bgmRef.current.pause()
    }
    bgmRef.current.addEventListener('ended', () => bgmRef.current.play())
    return () => {
      bgmRef.current.removeEventListener('ended', () => bgmRef.current.play())
      bgmRef.current.pause()
    }
  }, [openSound])

  return (
    <div className="fixed bottom-[24px] right-[24px] space-x-[16px]">
      <Link href='/how-to-play'>
        <button className="cursor-pointer transition-all active:translate-y-[4px]">
          <img className="h-[52px] w-[52px]" src="/assets/game/button-question.png" alt="" />
        </button>
      </Link>
      <button
        className="cursor-pointer transition-all active:translate-y-[4px]"
        onClick={handleOffSound}
      >
        <img className="h-[52px] w-[52px]" src="/assets/game/button-sound-off.png" alt="" />
      </button>
      <button
        className="cursor-pointer transition-all active:translate-y-[4px]"
        onClick={handleOnSound}
      >
        <img className="h-[52px] w-[52px]" src="/assets/game/button-sound-on.png" alt="" />
      </button>
    </div>
  )
}
