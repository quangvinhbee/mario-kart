import { RacePreview } from '@/components/common/RacePreview'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { PlayBanner } from '../home/PlayBanner'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

export const AboutUsPage = () => {
  const { address } = useAccount()

  useEffect(() => {}, [address])

  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="container pointer-events-none relative w-full px-[16px] pt-[40px]">
        <div className="w-[55%]">
          <PlayBanner />
        </div>
        <div className="absolute top-[60px] right-[5%] w-[40%] max-w-[487px] z-[100]">
          <div className="relative w-full">
            <Image
              className="aspect-[487/583] w-full"
              src="/assets/game/bg-dialog.png"
              alt=""
              width={487}
              height={583}
            />
            <div className="pointer-events-auto absolute top-[24%] left-[9%] right-[11%] bottom-[10%]">
              <p className="text-[17px] font-semibold">about us</p>
              <p className="mt-[40px] text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.{' '}
              </p>
              <div className="mt-[40px] flex items-center justify-between">
                <div className="w-[48%]">
                  <img
                    className="mx-auto w-full max-w-[155px]"
                    src="/assets/game/logo.png"
                    alt=""
                  />
                </div>
                <div className="w-[48%] space-y-[12px]">
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
                    <p>Buy token</p>
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
                    <p>view chart</p>
                  </Link>
                </div>
              </div>
              <div className="mt-[8px] flex justify-end">
                <Link href={'/'}>
                  <img
                    className="w-[104px] transition-all active:translate-y-[4px]"
                    src="/assets/game/button-back.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
