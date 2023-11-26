import { RacePreview } from '@/components/common/RacePreview'
import { shortenAddress } from '@/lib/helpers/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import { useAccount } from 'wagmi'
import { PlayBanner } from '../home/PlayBanner'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

export const ProfilePage = () => {
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
              <p className="text-[17px] font-semibold">User information</p>
              <div className="mt-[40px] flex justify-between text-[12px]">
                <p>Wallet address</p>
                <p>{shortenAddress(address)}</p>
              </div>
              <div className="mt-[16px] flex justify-between text-[12px]">
                <p>Balance</p>
                <p>
                  <NumericFormat displayType="text" value={12345} thousandSeparator />
                  <img
                    className="ml-[8px] inline-block w-[16px]"
                    src="/assets/game/ic-coin.svg"
                    alt=""
                  />
                </p>
              </div>
              <div className="mt-[24px] flex items-center justify-between space-x-[12px] text-[12px]">
                <p className="w-[100px]">Deposit:</p>
                <div className="flex w-[calc(100%-100px-89px-24px)] items-center justify-between bg-[#D9D9D9] px-[8px]">
                  <NumericFormat
                    className="h-[30px] w-[80%] font-retro outline-none"
                    thousandSeparator
                  />
                  <img
                    className="ml-[8px] inline-block w-[16px] cursor-pointer transition-all active:translate-y-[4px]"
                    src="/assets/game/ic-coin.svg"
                    alt=""
                  />
                </div>
                <img className="w-[89px]" src="/assets/game/button-confirm.svg" alt="" />
              </div>
              <div className="mt-[24px] flex items-center justify-between space-x-[12px] text-[12px]">
                <p className="w-[100px]">Withdraw:</p>
                <div className="flex w-[calc(100%-100px-89px-24px)] items-center justify-between bg-[#D9D9D9] px-[8px]">
                  <NumericFormat
                    className="h-[30px] w-[80%] font-retro outline-none"
                    thousandSeparator
                  />
                  <img
                    className="ml-[8px] inline-block w-[16px] cursor-pointer transition-all active:translate-y-[4px]"
                    src="/assets/game/ic-coin.svg"
                    alt=""
                  />
                </div>
                <img className="w-[89px]" src="/assets/game/button-confirm.svg" alt="" />
              </div>
              <div className="mt-[40px] flex items-center justify-between">
                <div className="w-[48%]">
                  <img
                    className="mx-auto w-full max-w-[155px]"
                    src="/assets/game/logo.png"
                    alt=""
                  />
                </div>
                <div className="w-[48%] space-y-[12px]">
                  <Link href={'#'}>
                    <a className="flex cursor-pointer items-center space-x-[8px]" target="_blank">
                      <img
                        className="animate-move-left-right w-[32px]"
                        src="/assets/game/ic-arrow-right.png"
                        alt=""
                      />
                      <p>Buy token</p>
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a className="flex cursor-pointer items-center space-x-[8px]" target="_blank">
                      <img
                        className="animate-move-left-right w-[32px]"
                        src="/assets/game/ic-arrow-right.png"
                        alt=""
                      />
                      <p>view chart</p>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-[8px] flex justify-end">
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
