import { Background } from '@/components/common/RacePreview/Background'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactSVG } from 'react-svg'
import { Header } from '../GameLayout/Header'

export function GameMenuLayout({ ...props }) {
  const router = useRouter()

  return (
    <Background>
      <Header />
      <div
        id="game-layout"
        className="relative h-screen w-full pt-[120px] flex justify-between items-start font-retro"
      >
        <div className="w-[300px] space-y-[16px]">
          {gameMenu?.map((item, i) => (
            <div className="flex items-center justify-end">
              {router?.pathname === item?.path && (
                <img
                  className="animate-move-left-right w-[38px] mr-[12px]"
                  src="/assets/game/ic-arrow-right.svg"
                  alt=""
                />
              )}
              <Link href={item?.path} className="block relative aspect-[204/42] w-[204px]">
                <ReactSVG
                  src="/assets/game/button-gray.svg"
                  className={` ${
                    router?.pathname === item?.path ? 'text-[#FFB156]' : 'text-[#C3C3C3]'
                  }`}
                />
                <p className="absolute top-[50%] translate-y-[-50%] text-[12px] w-full left-0 text-right px-[16px]">
                  {item?.label}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-[calc(100%-324px)] px-[16px] font-retro">{props.children}</div>
      </div>
    </Background>
  )
}

export const gameMenu = [
  {
    path: '/spin-race',
    label: 'SPIN RACERS',
  },
  {
    path: '/marketplace',
    label: 'marketplace',
  },
  {
    path: '/your-garage',
    label: 'your garage',
  },
  {
    path: '/stake',
    label: 'Stake',
  },
  {
    path: '/airdrop',
    label: 'AIRDROP',
  },
  {
    path: '/upgrade',
    label: 'Upgrade',
  },
]
