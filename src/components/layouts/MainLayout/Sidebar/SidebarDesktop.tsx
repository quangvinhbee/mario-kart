import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { FaCoins } from 'react-icons/fa'
import { MENUS } from './constants'

interface SidebarDesktopProps {
  [key: string]: any
}

export default function SidebarDesktop({ ...props }: SidebarDesktopProps) {
  return (
    <div className={`top-0 flex h-full w-[100px] flex-col justify-between shadow  sm:fixed`}>
      <Link href={'https://xspace.fi'} target="_blank">
        <div className={'hidden h-[14] cursor-pointer p-2 sm:block'}>
          <img className="w-full transition-all ease-out" src="/assets/logo.svg" alt="" />
        </div>
      </Link>
      <div
        className={
          'flex grow flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-2'
        }
      >
        {MENUS?.map((item, i) => (
          <SidebarItem item={item} key={i} />
        ))}
      </div>

      {/* <div className={`p-2 pb-4`}>
        <Link href="/claims">
          <a className="group hidden xs:block">
            <Button variant="contained" fullWidth>
              <FaCoins className="transform transition-all duration-200 group-hover:rotate-90" />
              <p className={`ml-2 hidden`}>{'claimCoin'}</p>
            </Button>
          </a>
        </Link>
      </div> */}
    </div>
  )
}

interface SidebarItemProps {
  isExpand?: boolean
  item?: any
  [key: string]: any
  onClose?: () => void
}

export function SidebarItem({ isExpand = true, item, onClose, ...props }: SidebarItemProps) {
  const router = useRouter()

  const pathname = router.pathname
  const isActive = useMemo(() => {
    if (item?.path === pathname) {
      return true
    }
    if (Array.isArray(item?.children)) {
      for (let sub of item?.children) {
        if (sub?.path === pathname) {
          return true
        }
      }
    }
    return false
  }, [item, pathname])

  return (
    <div className={` ${isActive ? 'py-[2px]' : 'py-[4px]'}`}>
      <Link href={item?.path || item?.children[0]?.path || ''}>
        <a
          onClick={onClose}
          className={
            `mx-auto block transition-all` + ` ${isActive ? '' : 'opacity-40 hover:opacity-100'}`
          }
        >
          {!!item?.label && item?.labelPosition === 'top' && (
            <p
              className={
                'mb-[4px] text-center font-serif text-[12px] uppercase leading-none' +
                ` ${!item?.onlyShowOnActive || isActive ? '' : 'hidden'}` +
                ` ${isActive ? 'text-red-600' : ''}`
              }
            >
              {item?.label}
            </p>
          )}
          <div
            className={
              'mx-auto flex items-center justify-center rounded-full' +
              ` ${isActive ? 'h-[50px] w-[50px]' : 'h-[60px] w-[60px] border border-neutral-500'}`
            }
          >
            <img
              className={'h-[50px] w-[50px] object-contain transition-all'}
              src={isActive ? item?.iconActive : item?.icon}
              alt=""
            />
          </div>
          {!!item?.label && item?.labelPosition === 'bottom' && (
            <p
              className={
                'mt-[4px] text-center font-serif text-[12px] uppercase leading-none' +
                ` ${!item?.onlyShowOnActive || isActive ? '' : 'hidden'}` +
                ` ${isActive ? 'text-red-600' : ''}`
              }
            >
              {item?.label}
            </p>
          )}
        </a>
      </Link>
      {isActive && item?.children?.length && (
        <div className="mt-[6px] space-y-[2px]">
          {item?.children?.map((item: any, j: number) => (
            <Link href={item?.path || ''} key={j}>
              <a
                className={
                  'mx-auto block h-[10px] w-[10px] rounded-full' +
                  ` ${
                    item?.path === pathname ? 'bg-red-600' : 'bg-neutral-300 hover:bg-neutral-600'
                  }`
                }
              ></a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
