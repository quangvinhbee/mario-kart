import { useMarioKart } from '@/providers/game-provider'
import { useWeb3Modal } from '@web3modal/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import { gameMenu } from '../../GameMenuLayout'

interface HeaderProps {
  onClickMenu?: () => void
  [key: string]: any
}

const menusPath = gameMenu?.map((item) => item?.path)

export function Header({ onClickMenu, ...props }: HeaderProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'mainLayout' })
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [walletAnchorEl, setWalletAnchorEl] = useState<any>(null)
  const [isOpenAutoCompleteMobile, setOpenAutocompleteMobile] = useState(false)
  const lang = useSelector((store: any) => store?.SettingCommonSlice.lang)
  const { open } = useWeb3Modal()
  const [isOpenLeaderBoard, setOpenLeaderBoard] = useState(false)
  const { userBalance } = useMarioKart()

  const [isOpenModalInfo, setIsOpenInfo] = useState(false)

  const { address } = useAccount()
  const router = useRouter()

  function shortenAddress(address: string) {
    return address?.substring(0, 5) + '...' + address?.substring(address.length - 3, address.length)
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[50] font-retro">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-[32px]">
            <Link href={'/'}>
              <Image src="/assets/game/logo.png" alt="" width={157} height={91} />
            </Link>
            <Link href={'#'} className="flex items-center space-x-[8px]" target="_blank">
              <img className="w-[32px]" src="/assets/game/ic-arrow-right.svg" alt="" />
              <p className="uppercase">TeleGram</p>
            </Link>
            <Link href={'#'} className="flex items-center space-x-[8px]" target="_blank">
              <img className="w-[32px]" src="/assets/game/ic-arrow-right.svg" alt="" />
              <p className="uppercase">X (Twitter)</p>
            </Link>
            <Link href={'/about-us'} className="flex items-center space-x-[8px]">
              <img className="w-[32px]" src="/assets/game/ic-arrow-right.svg" alt="" />
              <p className="uppercase">ABOUT US</p>
            </Link>
          </div>
          <div className="flex items-center space-x-[32px]">
            <div className="aspect-[394/63] w-[394px] bg-[url(/assets/game/button-yellow.svg)] bg-contain bg-no-repeat flex items-center px-[14px] pb-[0.5%]">
              <div className="aspect-[169/40] w-[163px] bg-[url(/assets/game/button-green-2.svg)] bg-contain bg-no-repeat flex items-center px-[10px] cursor-pointer">
                <img className="w-[20px] mr-[8px]" src="/assets/game/ic-coin.svg" alt="" />
                <NumericFormat
                  displayType="text"
                  className="text-[14px] font-retro"
                  value={+userBalance}
                  thousandSeparator
                />
              </div>
              {!menusPath?.includes(router.pathname) && (
                <Link href="/menu/spin-race">
                  <img
                    className="h-[40px] ml-[4px] cursor-pointer transition-all active:translate-y-[2px]"
                    src="/assets/game/button-menu.svg"
                    alt=""
                  />
                </Link>
              )}
              {menusPath?.includes(router.pathname) && (
                <Link href="/">
                  <img
                    className="h-[40px] ml-[4px] cursor-pointer transition-all active:translate-y-[2px]"
                    src="/assets/game/button-back-to-race.svg"
                    alt=""
                  />
                </Link>
              )}
            </div>
            {/* <Link
              href="/leaderboard"
              className="flex cursor-pointer items-center space-x-[8px]"
              onClick={(e) => {
                e.stopPropagation()
                setOpenLeaderBoard(!isOpenLeaderBoard)
              }}
            >
              <img className="w-[32px]" src="/assets/game/cup.png" alt="" />
              <p className="uppercase">leader board</p>
            </Link>
            <Link href="/about-us" className="flex items-center space-x-[8px]">
              <p className="uppercase">ABOUT US</p>
            </Link> */}
            {!address ? (
              <img
                className="w-[151px] cursor-pointer transition-all hover:scale-[1.02] active:translate-y-[4px]"
                src="/assets/game/button-login.png"
                alt=""
                onClick={() => open()}
              />
            ) : (
              <div className="relative">
                <div
                  className="cursor-pointer transition-all hover:scale-[1.02] active:translate-y-[4px]"
                  onClick={() => open()}
                >
                  <img className="w-[201px]" src="/assets/game/button-empty.png" alt="" />
                  <p className="absolute inset-x-0 top-[50%] translate-y-[-50%] text-center text-[18px]">
                    {shortenAddress(address)}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="absolute inset-x-0 top-[100%] mt-[12px] text-center text-[10px] uppercase"
                >
                  View user information
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div
        className={
          'absolute top-[96px] left-[40px] z-[600] transition-all' +
          ` ${isOpenLeaderBoard ? '' : 'pointer-events-none scale-95 opacity-0'}`
        }
      >
        <ClickAwayListener onClickAway={() => setOpenLeaderBoard(false)}>
          <div className="relative">
            <img
              className="aspect-[660/515] w-screen max-w-[660px]"
              src="/assets/game/bg-leaderboard.png"
              alt=""
            />
            <div className="absolute top-[14%] left-[10%] right-[6%] bottom-[40%] overflow-y-auto pr-[4%]">
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
            <img
              className="absolute top-[63%] right-[10%] w-[105px] cursor-pointer transition-all active:translate-y-[4px]"
              src="/assets/game/button-back.png"
              alt=""
              onClick={() => setOpenLeaderBoard(false)}
            />
          </div>
        </ClickAwayListener>
      </div> */}
    </>
  )
}
