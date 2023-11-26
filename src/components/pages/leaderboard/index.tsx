import { RacePreview } from '@/components/common/RacePreview'
import { shortenAddress } from '@/lib/helpers/utils'
import Image from 'next/image'
import Link from 'next/link'
import { NumericFormat } from 'react-number-format'
import { PlayBanner } from '../home/PlayBanner'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

export const Leaderboard = () => {
  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="container pointer-events-none relative w-full px-[16px] pt-[40px]">
        <div className="w-[55%]">
          <PlayBanner />
        </div>
        <div className="absolute top-[40px] right-[5%] w-[40%] max-w-[487px]">
          <div className="relative w-full">
            <Image
              className="aspect-[487/583] w-full"
              src="/assets/game/bg-dialog.png"
              alt=""
              width={487}
              height={583}
            />
            <div className="pointer-events-auto absolute top-[24%] left-[9%] right-[11%] bottom-[10%]">
              <p className="text-[17px] font-semibold">Leaderboard</p>

              <div className="mt-[40px] overflow-y-auto h-[240px] pr-[16px]">
                <div className="space-y-[24px]">
                  {[...Array(10)].map((item, i) => (
                    <div className="flex items-center" key={i}>
                      <p className="flex-grow">{shortenAddress('0x1233213213121321589')}</p>
                      <NumericFormat displayType="text" value={12345} thousandSeparator />
                      <img
                        className="ml-[8px] inline-block w-[16px]"
                        src="/assets/game/ic-coin.svg"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[24px] flex justify-end">
                <Link href={'/'}>
                  <a className="cursor-pointer">
                    <img
                      className="w-[104px] transition-all active:translate-y-[4px]"
                      src="/assets/game/button-back.png"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
