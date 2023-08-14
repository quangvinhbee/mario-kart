import { MenuItem, MenuList, Popover } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosArrowDown } from 'react-icons/io'

interface SidebarItemProps {
  isExpand?: boolean
  item?: any
  [key: string]: any
  onClose?: () => void
}

export default function SidebarItem({
  isExpand = true,
  item,
  onClose,
  ...props
}: SidebarItemProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'mainLayout' })
  const router = useRouter()
  const [isExpandItem, setExpandItem] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  let content = (
    <Link href={item?.path}>
      <a
        onClick={onClose}
        className={
          `mx-auto flex h-12 cursor-pointer items-center` +
          ` ${
            router.pathname === item?.path
              ? 'rounded-xl bg-[#2E2E60]'
              : 'text-gray-700 dark:text-white'
          }` +
          ` ${isExpand ? 'w-auto justify-start px-3' : 'w-12 justify-center'}`
        }
      >
        <img className="h-8 w-8 object-contain" src={item?.icon} alt="" />
        {isExpand && (
          <>
            <p className={`ml-2 font-medium`}>{item?.label}</p>
          </>
        )}
      </a>
    </Link>
  )

  if (item?.children?.length && isExpand) {
    content = (
      <div>
        <div
          className={
            `mx-auto flex h-12 cursor-pointer items-center` +
            ` ${router.pathname === item?.path ? 'rounded-xl bg-[#2E2E60]' : ''}` +
            ` ${isExpand ? 'w-auto justify-start px-3' : 'w-12 justify-center'}`
          }
          onClick={() => {
            setExpandItem(!isExpandItem)
          }}
        >
          <img className="h-6 w-6 object-contain" src={item?.icon} alt="" />
          {isExpand && (
            <>
              <p className={`ml-2 flex-grow font-medium`}>{item?.label}</p>
            </>
          )}
          {isExpand && (
            <IoIosArrowDown
              className={
                'text-[#7E7EA0] transition-transform' + ` ${isExpandItem ? 'rotate-180' : ''}`
              }
            />
          )}
        </div>
        {isExpand && (
          <div
            className={
              'overflow-hidden transition-all' +
              ` ${isExpandItem ? 'max-h-[1000px]' : 'max-h-[0px]'}`
            }
          >
            {item?.children?.map((sub: any, j: number) => (
              <div className="relative flex justify-end">
                <div className="absolute top-[-32px] left-6 h-[56px] w-[8px] rounded-bl-[6px] border-b-2 border-l-2 border-[#474774]"></div>
                <Link href={sub?.path}>
                  <a
                    className={
                      'flex h-12 w-[calc(100%-2rem)] items-center px-3 font-medium' +
                      ` ${
                        router.pathname === sub?.path ? 'rounded-xl bg-[#2E2E60]' : 'text-[#7E7EA0]'
                      }`
                    }
                    onClick={onClose}
                  >
                    {sub?.label}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (item?.children?.length && !isExpand) {
    content = (
      <div className="">
        <div
          className={
            `mx-auto flex h-12 w-12 cursor-pointer items-center` +
            ` ${router.pathname === item?.path ? 'rounded-xl bg-[#2E2E60]' : ''}` +
            ` ${isExpand ? 'w-auto justify-start px-3' : 'w-12 justify-center'}`
          }
          onClick={(e) => {
            setAnchorEl(e.currentTarget)
          }}
        >
          <img className="h-6 w-6 object-contain" src={item?.icon} alt="" />
        </div>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuList>
            {item?.children?.map((sub: any, j: number) => (
              <Link href={sub?.path}>
                <MenuItem
                  onClick={() => {
                    onClose()
                    setAnchorEl(null)
                  }}
                >
                  <a
                    className={
                      'flex w-[calc(100%-2rem)] items-center px-3 font-medium' +
                      ` ${router.pathname === sub?.path ? 'text-white' : 'text-white opacity-60'}`
                    }
                  >
                    {sub?.label}
                  </a>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Popover>
      </div>
    )
  }

  return <div className="py-[2]">{content}</div>
}
