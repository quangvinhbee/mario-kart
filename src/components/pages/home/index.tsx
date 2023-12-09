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
          <Link
            href={'https://0xraces-comp.gitbook.io/0xrace/'}
            className="flex cursor-pointer items-center space-x-[8px]"
            target="_blank"
          >
            <img
              className="animate-move-left-right w-[32px]"
              src="/assets/game/ic-arrow-right.svg"
              alt=""
            />
            <p className="uppercase">WHITEPAPER</p>
          </Link>

          <Link
            href={'#'}
            className="flex cursor-pointer items-center space-x-[8px]"
            target="_blank"
          >
            <img
              className="animate-move-left-right w-[32px]"
              src="/assets/game/ic-arrow-right.svg"
              alt=""
            />
            <p className="uppercase">buy token</p>
          </Link>

          <Link
            href={'#'}
            className="flex cursor-pointer items-center space-x-[8px]"
            target="_blank"
          >
            <img
              className="animate-move-left-right w-[32px]"
              src="/assets/game/ic-arrow-right.svg"
              alt=""
            />
            <p className="uppercase">view chart</p>
          </Link>
          <Link
            href={'#'}
            className="flex cursor-pointer items-center space-x-[8px]"
            target="_blank"
          >
            <img
              className="animate-move-left-right w-[32px]"
              src="/assets/game/ic-arrow-right.svg"
              alt=""
            />
            <p className="uppercase">coinmarketcap</p>
          </Link>
        </div>
      </div>
    </>
  )
}
