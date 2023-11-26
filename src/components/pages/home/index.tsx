import { RacePreview } from '@/components/common/RacePreview'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { PlayBanner } from './PlayBanner'

export const HomePage = () => {
  const { address } = useAccount()

  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="pointer-events-none relative w-full pt-[40px]">
        <PlayBanner />
        <div className="pointer-events-auto absolute left-[64px] top-[120px] space-y-[24px]">
          <Link href={'#'}>
            <a className="flex cursor-pointer items-center space-x-[8px]" target="_blank">
              <img
                className="animate-move-left-right w-[32px]"
                src="/assets/game/ic-arrow-right.png"
                alt=""
              />
              <p className="uppercase">buy token</p>
            </a>
          </Link>
          <Link href={'#'}>
            <a className="flex cursor-pointer items-center space-x-[8px]" target="_blank">
              <img
                className="animate-move-left-right w-[32px]"
                src="/assets/game/ic-arrow-right.png"
                alt=""
              />
              <p className="uppercase">view chart</p>
            </a>
          </Link>
          <Link href={'#'}>
            <a className="flex cursor-pointer items-center space-x-[8px]" target="_blank">
              <img
                className="animate-move-left-right w-[32px]"
                src="/assets/game/ic-arrow-right.png"
                alt=""
              />
              <p className="uppercase">coinmarketcap</p>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
