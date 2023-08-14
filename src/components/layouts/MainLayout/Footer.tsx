import Link from 'next/link'
import { createElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineTwitter } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { FaFacebook, FaTelegram, FaTelegramPlane } from 'react-icons/fa'

export function Footer() {
  const { t } = useTranslation('translation', { keyPrefix: 'mainLayout.footer' })
  const [expandIndex, setExpandIndex] = useState(-1)

  const FOOTERS = getFooter(t)
  return (
    <footer className="flex flex-wrap py-10 px-4 shadow-xl lg:flex-nowrap xl:px-10">
      <Link href={'https://xspace.fi'} target="_blank">
        <a className="mb-4 block w-full lg:w-auto">
          <img src="/assets/large-logo.png" alt="" className="col-span-2 mx-auto max-w-[300px]" />
        </a>
      </Link>
      <div className="hidden flex-wrap justify-evenly gap-4 space-x-4 sm:space-x-10 lg:ml-20 lg:flex lg:justify-start">
        {FOOTERS.map((item) => (
          <div className="col-span-1 flex flex-col ">
            <div className="text-sm font-bold">{item.label}</div>
            <div className="mt-2 flex flex-col">
              {item.menus.map((item: any) => (
                <Link href={item.link}>
                  <a href={item.link} className="item-center flex py-1 text-sm">
                    {!!item.icon && createElement(item.icon, { className: 'text-[18px] mr-1' })}
                    <span>{item.label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-1 flex flex-col ">
          <div className="text-sm font-bold">{t('social')}</div>
          <div className="mt-2 flex flex-wrap space-x-4">
            {SOCIALS.map((item: any) => (
              <Link href={item.link}>
                <a href={item.link} className="item-center flex py-1 text-sm">
                  {createElement(item.icon, { className: 'text-[24px] mr-1' })}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-1 flex flex-col ">
          <div className="text-sm font-bold">{t('contact')}</div>
          <div className="mt-2 flex flex-wrap space-x-4">
            Email:{' '}
            <a href="mailto:info@xspace.fi" className="ml-2">
              info@xspace.fi
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full space-y-4 px-4 lg:hidden">
        {FOOTERS.map((item, i) => (
          <div className="col-span-1 flex flex-col ">
            <div
              className="flex cursor-pointer items-center justify-between font-bold"
              onClick={() => setExpandIndex(expandIndex === i ? -1 : i)}
            >
              {item.label}
              <BiChevronDown
                className={'transition-all' + ` ${expandIndex === i ? 'rotate-180' : ''}`}
              />
            </div>
            <div
              className={
                'mt-2 flex flex-col overflow-hidden transition-all' +
                ` ${expandIndex === i ? 'max-h-[1000px]' : 'max-h-0'}`
              }
            >
              {item.menus.map((item: any) => (
                <Link href={item.link}>
                  <a href={item.link} className="item-center flex py-1 text-sm">
                    {!!item.icon && createElement(item.icon, { className: 'text-[18px] mr-1' })}
                    <span>{item.label}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-1 flex flex-col ">
          <div className="font-bold">{t('social')}</div>
          <div className="mt-2 flex flex-wrap space-x-4">
            {SOCIALS.map((item: any) => (
              <Link href={item.link}>
                <a href={item.link} className="item-center flex py-1 text-sm">
                  {createElement(item.icon, { className: 'text-[24px] mr-1' })}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

const getFooter = (t: any) => [
  {
    label: t('company'),
    menus: [
      {
        label: t('aboutUs'),
        link: '/about-us',
      },
      {
        label: t('privacyTerms'),
        link: '/privacy-policy',
      },
    ],
  },
]

export const SOCIALS = [
  {
    link: 'https://twitter.com/xspacefi/',
    label: 'Twitter',
    icon: AiOutlineTwitter,
  },
  {
    link: 'https://www.facebook.com/xspaceglobal',
    label: 'Facebook',
    icon: FaFacebook,
  },
  {
    link: 'https://t.me/xspacefi',
    label: 'Channel',
    icon: FaTelegramPlane,
  },
  // {
  //   link: 'https://t.me/xspacefi_listing',
  //   label: 'Listing Alert',
  //   icon: BsTelegram,
  // },
  {
    link: 'https://t.me/xspacefi_global',
    label: 'Chat ',
    icon: FaTelegram,
  },
  // {
  //   link: '',
  //   label: 'GitHub',
  //   icon: BsGithub,
  // },
  // {
  //   link: '',
  //   label: 'Facebook',
  //   icon: BsFacebook,
  // },
  // {
  //   link: '',
  //   label: 'Youtube',
  //   icon: BsYoutube,
  // },
]
