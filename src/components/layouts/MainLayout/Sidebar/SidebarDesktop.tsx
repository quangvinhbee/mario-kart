import { Button } from '@mui/material'
import Link from 'next/link'
import { FaCoins } from 'react-icons/fa'
import { MENUS } from './constants'
import SidebarItem from './SidebarItem'

interface SidebarDesktopProps {
  [key: string]: any
}

export default function SidebarDesktop({ ...props }: SidebarDesktopProps) {
  return (
    <>
      <div
        className={`top-0 flex h-full w-[80px] flex-col justify-between border-r border-white bg-white shadow transition-all duration-300 dark:border-[#292929] dark:bg-[#1B1B44] sm:fixed`}
      >
        <Link href={'https://xspace.fi'} target="_blank">
          <div className={'hidden h-[14] cursor-pointer p-2 sm:block'}>
            <img className="w-full transition-all ease-out" src="/assets/logo.svg" alt="" />
          </div>
        </Link>
        <div className={'grow overflow-y-auto overflow-x-hidden p-2'}>
          {MENUS?.map((item, i) => (
            <SidebarItem item={item} key={i} />
          ))}
        </div>

        <div className={`p-2 pb-4`}>
          <Link href="/claims">
            <a className="group hidden xs:block">
              <Button variant="contained" fullWidth>
                <FaCoins className="transform transition-all duration-200 group-hover:rotate-90" />
                <p className={`ml-2 hidden`}>{'claimCoin'}</p>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
