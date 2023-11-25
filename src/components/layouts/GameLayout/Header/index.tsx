import { changeLanguageSetting } from '@/redux/common/setting'
import { useWeb3Modal } from '@web3modal/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount, useDisconnect } from 'wagmi'

interface HeaderProps {
  onClickMenu?: () => void
  [key: string]: any
}

export function Header({ onClickMenu, ...props }: HeaderProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'mainLayout' })
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [walletAnchorEl, setWalletAnchorEl] = useState<any>(null)
  const [isOpenAutoCompleteMobile, setOpenAutocompleteMobile] = useState(false)
  const lang = useSelector((store: any) => store?.SettingCommonSlice.lang)
  const { open } = useWeb3Modal()

  const [isOpenModalInfo, setIsOpenInfo] = useState(false)

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const onChangeLanguage = async (lang: string) => {
    if (typeof window !== 'undefined') {
      dispatch(changeLanguageSetting(lang))
      window.localStorage.setItem('lang', lang)
    }
  }

  const flagImg: any = {
    en: '/assets/main-layout/flag/UK.svg',
    cn: '/assets/main-layout/flag/CN.svg',
    vi: '/assets/main-layout/flag/VI.png',
  }

  const onConnectWalletConnect = async () => {
    await open()
  }

  function shortenAddress(address: string) {
    return address?.substring(0, 5) + '...' + address?.substring(address.length - 3, address.length)
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-500">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-[32px]">
            <Image src="/assets/game/logo.png" alt="" width={157} height={91} />
            <Link href={'#'}>
              <a className="flex items-center space-x-[8px]" target="_blank">
                <img className="w-[32px]" src="/assets/game/ic-arrow-right.png" alt="" />
                <p className="uppercase">TeleGram</p>
              </a>
            </Link>
            <Link href={'#'}>
              <a className="flex items-center space-x-[8px]" target="_blank">
                <img className="w-[32px]" src="/assets/game/ic-arrow-right.png" alt="" />
                <p className="uppercase">X (Twitter)</p>
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-[32px]">
            <Link href='/leaderboard'>
              <a className="flex items-center space-x-[8px]">
                <img className="w-[32px]" src="/assets/game/cup.png" alt="" />
                <p className="uppercase">leader board</p>
              </a>
            </Link>
            <Link href='/about-us'>
              <a className="flex items-center space-x-[8px]">
                <p className="uppercase">ABOUT US</p>
              </a>
            </Link>
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
                <p className="absolute inset-x-0 top-[100%] mt-[12px] text-center text-[10px] uppercase">
                  View user information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
