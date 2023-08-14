import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { AiOutlineClose } from 'react-icons/ai'
import { FaCoins, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import useScreen from '../../../../lib/hooks/useScreen'
import { MENUS, SOCIAL_ICON } from './constants'
import SidebarItem from './SidebarItem'
import { useAccount } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'
import { shortenAddress } from '@/lib/helpers/utils'
import ModalInfoAddress from '../Header/ModalInfoAddress'

interface PropsType extends ReactProps {}

interface SidebarProps {
  isExpand?: boolean
  isOpen?: boolean
  onClose?: () => void
  [key: string]: any
}

export default function SidebarMobile({
  isExpand = true,
  isOpen,
  onClose,
  ...props
}: SidebarProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'mainLayout.sideBar' })
  const dispatch = useDispatch()
  const theme = useSelector((state: any) => state.SettingCommonSlice.theme)
  const router = useRouter()

  const screen = useScreen('md')
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const [isOpenModalInfo, setIsOpenInfo] = useState(false)

  useEffect(() => {
    if (typeof window != 'undefined') {
      const htmlElement = document.querySelector('html')
      if (htmlElement && theme) {
        htmlElement.classList.value = ''
        htmlElement.classList?.add(theme)
      }
    }
  }, [theme])

  const onConnectWalletConnect = async () => {
    await open()
  }

  return (
    <>
      <ModalInfoAddress openModal={isOpenModalInfo} handleClose={() => setIsOpenInfo(false)} />

      <div
        className={
          'fixed inset-0 z-500 flex h-screen flex-col justify-between border-r border-white bg-white shadow transition-all duration-300 dark:border-[#292929] dark:bg-[#1B1B44] sm:fixed' +
          ` ${isOpen ? '' : '-translate-x-full'}`
        }
      >
        <div className="flex h-18 items-center justify-between border-b border-black p-3">
          <Link href={'https://xspace.fi/'}>
            <a target="_blank">
              <div className="cursor-pointer p-4">
                <img className="w-full transition-all ease-out" src="/assets/logo.png" alt="" />
              </div>
            </a>
          </Link>
          <AiOutlineClose className="cursor-pointer text-[24px]" onClick={onClose} />
        </div>
        <div className="max-h-[calc(100vh-150px)] flex-grow overflow-y-auto p-4">
          {MENUS?.map((item, i) => (
            <SidebarItem isExpand={true} item={item} key={i} onClose={onClose} />
          ))}

          {/* {!isConnected ? (
            <Button
              variant="contained"
              onClick={onConnectWalletConnect}
              className="inline-flex whitespace-nowrap xs:hidden"
            >
              <img className="mr-2 w-[24px]" src="/assets/main-layout/ic-wallet.svg" alt="" />
              {t('mainLayout.connectWallet')}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={(e) => {
                setIsOpenInfo(true)
              }}
              className="inline-flex xs:hidden"
            >
              <img className="mr-2 w-[24px]" src="/assets/main-layout/ic-wallet.svg" alt="" />
              {shortenAddress(address)}
            </Button>
          )} */}
          <div className="pt-4">
            <Link href="/add-coin">
              <a className="group hidden xs:block" onClick={onClose}>
                <Button variant="contained" fullWidth>
                  <i className="mr-2 transform transition-all duration-200 group-hover:rotate-90">
                    <FaPlus />
                  </i>
                  {t('addCoin')}
                </Button>
              </a>
            </Link>
          </div>

          <div className={`pb-4 pt-2`}>
            <Link href="claims">
              <a className="group hidden xs:block" onClick={onClose}>
                <Button variant="contained" fullWidth>
                  <FaCoins className="transform transition-all duration-200 group-hover:rotate-90" />
                  <p className={`ml-2` + ` ${isExpand ? '' : 'hidden'}`}>{t('claimCoin')}</p>
                </Button>
              </a>
            </Link>
          </div>
        </div>

        <div className={'flex items-center justify-between border-t-2 border-[#2E2E60] p-4'}>
          {/* <p>Find us</p> */}
          <div className={'flex' + ` ${isExpand ? 'space-x-2' : 'flex-col space-y-2'}`}>
            {SOCIAL_ICON.map((item, i) => (
              <a
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3C3C7C]"
                href={item?.path}
                target="_blank"
              >
                {item?.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
