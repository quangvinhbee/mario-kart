import { RacePreview } from '@/components/common/RacePreview'
import { shortenAddress } from '@/lib/helpers/utils'
import { useMarioKart } from '@/providers/game-provider'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoReload } from 'react-icons/io5'
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
  const { depositHandler, userBalance, refreshBalance, depositLoad, withdrawHandler } =
    useMarioKart()

  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)

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
              <p className="text-[17px] font-semibold">User information</p>
              <div className="mt-[40px] flex justify-between text-[12px]">
                <p>Wallet address</p>
                <p>{shortenAddress(address)}</p>
              </div>
              <div className="mt-[16px] flex justify-between text-[12px]">
                <p>Balance</p>
                <p className="flex items-center gap-2">
                  <NumericFormat displayType="text" value={userBalance} thousandSeparator />{' '}
                  <button className="cursor-pointer" onClick={() => refreshBalance()}>
                    <IoReload />
                  </button>{' '}
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
                    value={depositAmount}
                    disabled={depositLoad}
                    onChange={(e) => setDepositAmount(Number(e.target.value.replace(',', '')))}
                  />
                  <img
                    className="ml-[8px] inline-block w-[16px] cursor-pointer transition-all active:translate-y-[4px]"
                    src="/assets/game/ic-coin.svg"
                    alt=""
                  />
                </div>
                <button
                  className={`cursor-pointer ${depositLoad && 'opacity-60'}`}
                  onClick={() => depositHandler(depositAmount)}
                  disabled={depositLoad}
                >
                  <img className="w-[89px]" src="/assets/game/button-confirm.svg" alt="" />
                </button>
              </div>
              <div className="mt-[24px] flex items-center justify-between space-x-[12px] text-[12px]">
                <p className="w-[100px]">Withdraw:</p>
                <div className="flex w-[calc(100%-100px-89px-24px)] items-center justify-between bg-[#D9D9D9] px-[8px]">
                  <NumericFormat
                    className="h-[30px] w-[80%] font-retro outline-none"
                    thousandSeparator
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value.replace(',', '')))}
                  />
                  <img
                    className="ml-[8px] inline-block w-[16px] cursor-pointer transition-all active:translate-y-[4px]"
                    src="/assets/game/ic-coin.svg"
                    alt=""
                  />
                </div>
                <img
                  className="w-[89px] cursor-pointer"
                  src="/assets/game/button-confirm.svg"
                  alt=""
                  onClick={() => withdrawHandler(withdrawAmount)}
                />
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
                <Link href={'/'} className="cursor-pointer">
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
