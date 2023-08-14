import { LANGUAGE } from '@/constants/lang'
import { shortenAddress } from '@/lib/helpers/utils'
import { changeLanguageSetting } from '@/redux/common/setting'
import { Button, Menu, MenuItem } from '@mui/material'
import { useWeb3Modal } from '@web3modal/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosMenu } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount, useDisconnect } from 'wagmi'
import AutoComplete from './AutoComplete'
import AutoCompleteMobile from './AutoCompleteMobile'
import ModalInfoAddress from './ModalInfoAddress'
import Trending from './Trending'
import Link from 'next/link'

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

  return (
    <>
      <ModalInfoAddress openModal={isOpenModalInfo} handleClose={() => setIsOpenInfo(false)} />

      <div className="sticky top-0 z-100 bg-white shadow backdrop-blur-lg dark:border-b dark:border-[#292929] dark:bg-[#1B1B44]">
        <div className="flex h-18 w-full items-center justify-between px-4">
          <Trending />
          <div className="sm:hidden">
            <Link href={'https://xspace.fi/'}>
              <img className="w-full transition-all ease-out" src="/assets/logo.png" alt="" />
            </Link>
          </div>
          <div></div>

          <div className="flex items-center space-x-6 text-[20px]">
            <div className="hidden sm:block">
              <AutoComplete />
            </div>
            {!isConnected ? (
              <Button
                variant="contained"
                onClick={onConnectWalletConnect}
                className="whitespace-nowrap"
              >
                <img className="mr-2  w-[24px] " src="/assets/main-layout/ic-wallet.svg" alt="" />
                {t('connectWallet')}
              </Button>
            ) : (
              <Button
                variant="contained"
                className="whitespace-nowrap"
                onClick={(e) => {
                  setIsOpenInfo(true)
                  setWalletAnchorEl(e.currentTarget)
                }}
              >
                <img className="mr-2 w-[24px] " src="/assets/main-layout/ic-wallet.svg" alt="" />
                {shortenAddress(address)}
              </Button>
            )}
            <div className="flex items-center" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <img className="w-[24px] cursor-pointer" src={flagImg[lang] || flagImg?.en} alt="" />
            </div>

            <div className="cursor-pointer text-[24px] sm:hidden">
              <AiOutlineSearch onClick={() => setOpenAutocompleteMobile(true)} />
            </div>
            <div className="cursor-pointer text-[24px] sm:hidden">
              <IoIosMenu onClick={() => onClickMenu && onClickMenu()} />
            </div>
          </div>
        </div>
        {isOpenAutoCompleteMobile && (
          <AutoCompleteMobile onClose={() => setOpenAutocompleteMobile(false)} />
        )}
        <Menu
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(false)
              onChangeLanguage(LANGUAGE.EN)
            }}
          >
            <div>
              <img
                className="w-[24px] cursor-pointer"
                src="/assets/main-layout/flag/UK.svg"
                alt=""
              />
            </div>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(false)
              onChangeLanguage(LANGUAGE.CN)
            }}
          >
            <div>
              <img
                className="w-[24px] cursor-pointer"
                src="/assets/main-layout/flag/CN.svg"
                alt=""
              />
            </div>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(false)
              onChangeLanguage(LANGUAGE.VI)
            }}
          >
            <div>
              <img
                className="w-[24px] cursor-pointer"
                src="/assets/main-layout/flag/VI.png"
                alt=""
              />
            </div>
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}
