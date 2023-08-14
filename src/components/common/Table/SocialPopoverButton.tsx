// import { Popover, Transition } from '@headlessui/react'
import { toHumanRead } from '@/utils/formatNumber'
import { IconButton, Popover } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FaDiscord,
  FaEllipsisH,
  FaGlobe,
  FaMediumM,
  FaTelegramPlane,
  FaTwitter,
} from 'react-icons/fa'
import { useSelector } from 'react-redux'

interface SocialPopoverButtonProps {
  [key: string]: any
}

export default function SocialPopoverButton({
  links = [],
  className = '',
  ...props
}: SocialPopoverButtonProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'tableComponent' })
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const lang = useSelector((state: any) => state.SettingCommonSlice.lang)
  TimeAgo.addLocale(en)

  return (
    <div
      className={'flex items-center gap-2' + ` ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Link href={links?.find((item: any) => item.name == 'TWITTER')?.link || ''}>
        <a
          href={links?.find((item: any) => item.name == 'TWITTER')?.link || ''}
          className="rounded-full bg-[#2E2E60] px-1 py-1"
          target={'_blank'}
        >
          <div className="flex min-w-[70px] items-center justify-center gap-1">
            <i className="text-[#1DA1F2]">
              <FaTwitter />
            </i>

            {toHumanRead(links?.find((item: any) => item.name == 'TWITTER')?.socialCount)}
          </div>
        </a>
      </Link>
      <Link
        href={
          links?.find((item: any) => item.link_type_id == 2 || item.link_type_id == 3)?.link || ''
        }
      >
        <a
          href={links?.find((item: any) => item?.name?.includes('TELEGRAM'))?.link || ''}
          className="rounded-full bg-[#2E2E60] px-1 py-1"
          target={'_blank'}
        >
          <div className="flex min-w-[70px] items-center justify-center gap-1">
            <i className="text-[#1DA1F2]">
              <FaTelegramPlane />
            </i>
            {toHumanRead(links?.find((item: any) => item?.name?.includes('TELEGRAM'))?.socialCount)}
          </div>
        </a>
      </Link>
      {links?.length > 0 && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setAnchorEl(e.currentTarget)
          }}
        >
          <FaEllipsisH className="text-white" />
        </IconButton>
      )}
      <Popover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        className="mt-2"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="transform rounded-md border border-gray-600 bg-[#f3f3f3] dark:bg-[#141414] dark:text-gray-300">
          <div className="overflow-hidden rounded-lg shadow-lg">
            {links?.map((item: any) => {
              let temp = type_socials.find((social) => social.name === item.name)
              if (temp)
                return (
                  <div className="">
                    <Link href={item?.link}>
                      <a
                        href={item?.link}
                        target={'_blank'}
                        className="flex items-center gap-2 py-2 px-4 font-semibold transition-all duration-200 hover:dark:bg-[#1f1f1f]"
                      >
                        <i className="dark:text-gray-300">
                          {type_socials.find((social) => social.name === item.name)?.icon}
                        </i>
                        <span className="">
                          {type_socials.find((social) => social.name === item.name)?.title}
                        </span>
                      </a>
                    </Link>
                  </div>
                )
            })}
          </div>
        </div>
      </Popover>
    </div>
  )
}

export const type_socials = [
  {
    link_id_type: 1,
    name: 'WEBSITE',
    title: 'Website',
    icon: <FaGlobe />,
  },
  {
    link_id_type: 2,
    name: 'CHINESE_TELEGRAM',
    title: 'Chinese Telegram',
    icon: <FaTelegramPlane />,
  },
  {
    link_id_type: 3,
    name: 'ENGLISH_TELEGRAM',
    title: 'English Telegram',
    icon: <FaTelegramPlane />,
  },
  {
    link_id_type: 7,
    name: 'TELEGRAM',
    title: 'English Telegram',
    icon: <FaTelegramPlane />,
  },
  {
    link_id_type: 4,
    name: 'TWITTER',
    title: 'Twitter',
    icon: <FaTwitter />,
  },
  {
    link_id_type: 5,
    name: 'MEDIUM',
    title: 'Medium',
    icon: <FaMediumM />,
  },
  {
    link_id_type: 6,
    name: 'DISCORD',
    title: 'Discord',
    icon: <FaDiscord />,
  },
]
