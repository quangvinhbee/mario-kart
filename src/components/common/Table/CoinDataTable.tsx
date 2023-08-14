import { shortenNumber } from '@/lib/helpers/utils'
// import { Popover, Transition } from '@headlessui/react'
import { Skeleton } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaGlobe, FaMediumM, FaTelegramPlane, FaTwitter } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp, IoIosInformationCircleOutline } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toHumanRead } from '../../../utils/formatNumber'
import { VoteButton } from '../Button/VoteButton'
import SocialPopoverButton from './SocialPopoverButton'

interface CoinDataTableProps {
  data: any[]
  onHeaderCellClick?: (field: string) => void
  [key: string]: any
}

export function CoinDataTable({
  data,
  promote = false,
  loading = false,
  sort = {},
  onChange,
  onHeaderCellClick,
  ...props
}: CoinDataTableProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'tableComponent' })
  const [idToOpenSocialPopover, setIdToOpenPopover] = useState(null)
  const lang = useSelector((state: any) => state.SettingCommonSlice.lang)
  TimeAgo.addLocale(en)
  const [coins, setCoins] = useState(data)
  const [idToOpen, setIdToOpen] = useState('')

  const handleSetIdToOpen = (id: string) => {
    setIdToOpen((oldId) => (oldId === id ? '' : id))
  }

  useEffect(() => {
    setCoins(data)
  }, [data])

  return (
    <>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full overflow-x-auto rounded-[24px] py-[24px] shadow-lg">
          <thead className="text-[12px] text-[#7E7EA0]">
            <tr>
              <th className=" font-normal">#</th>
              <th className="sticky left-0 z-[5] min-w-[120px]">
                <div className="flex items-center justify-center">
                  {promote ? (
                    <div className="font-bold text-[#FFB600]">{t('promotedCoin')} </div>
                  ) : (
                    t('coinName')
                  )}
                </div>
              </th>
              <th className="text-left font-normal">{t('price')}</th>
              <th className="text-center font-normal">{t('protocol')}</th>
              <th
                className="cursor-pointer text-center font-normal"
                onClick={() => onHeaderCellClick && onHeaderCellClick('change24h')}
              >
                {t('change24h')}{' '}
                {sort?.sortBy === 'change24h' &&
                  (sort?.sortDirection === 'desc' ? (
                    <IoIosArrowDown className="inline" />
                  ) : (
                    <IoIosArrowUp className="inline" />
                  ))}
              </th>
              <th
                className="cursor-pointer text-right font-normal"
                onClick={() => onHeaderCellClick && onHeaderCellClick('volume24h')}
              >
                {t('volume24h')}{' '}
                {sort?.sortBy === 'volume24h' &&
                  (sort?.sortDirection === 'desc' ? (
                    <IoIosArrowDown className="inline" />
                  ) : (
                    <IoIosArrowUp className="inline" />
                  ))}
                <IoIosInformationCircleOutline className="inline text-[18px]" />
              </th>
              <th className="text-right font-normal">
                {t('marketCap')} <IoIosInformationCircleOutline className="inline text-[18px]" />
              </th>
              <th className="text-left font-normal">{t('community')}</th>
              <th className="text-left font-normal">{t('launchDay')}</th>
              <th className="text-center font-normal">{t('upvote')}</th>
            </tr>
          </thead>
          <tbody className="text-[14px] font-normal text-white dark:text-white">
            {loading &&
              [...new Array(10)].map((item, i) => (
                <tr key={i}>
                  <td colSpan={10}>
                    <Skeleton variant="rectangular" height={30} width="100%" />
                  </td>
                </tr>
              ))}
            {!loading &&
              coins?.map((item, i) => (
                <Link href={`/coin/${item.slug}`}>
                  <a className="group table-row cursor-pointer border-t border-t-[#ffffff14] align-middle transition-all duration-100 hover:bg-[#1b1b44dd] hover:dark:bg-[#1B1B44]">
                    <td>{item?.id}</td>
                    <td className="min-w-[120px]">
                      <div className="flex items-center gap-2 ">
                        <img src={item.logo} alt="" className="h-10 w-10 rounded-md object-cover" />
                        <div className="flex flex-col overflow-hidden text-sm">
                          <span className="flex flex-col overflow-hidden text-ellipsis xl:flex-row xl:items-center xl:gap-2">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`flex items-center`}>
                        ${shortenNumber(item?.pricePlain)}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        {item?.chains?.map((chainInfo: any, i: number) => (
                          <div
                            className="flex min-w-max select-none items-center gap-1 rounded-full"
                            key={i}
                          >
                            <img
                              src={`/assets/icons/${chainInfo?.chain?.scanKey}.svg`}
                              alt=""
                              className="w-6 rounded-full"
                            />
                            <span className="text-14">{chainInfo?.chain?.symbol}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`flex justify-end gap-1 text-[12px] ${Number(item?.change24h) > 0 ? 'text-[#5BEEB9]' : ' text-[#FF4775]'
                          }`}
                      >
                        {item?.change24h < 0 ? (
                          <IoIosArrowDown className="inline" />
                        ) : (
                          <IoIosArrowUp className="inline" />
                        )}
                        {Math.abs(Number(item?.change24h || 0))}%
                      </div>
                    </td>
                    <td className="text-right">
                      <p>{toHumanRead(Math.abs(Number(item?.volume24h)))}$</p>
                      <p className="text-[12px] text-[#7E7EA0]">
                        {Intl.NumberFormat(undefined).format(item?.volume24h)} {item?.symbol}
                      </p>
                    </td>
                    <td className="text-right">${item?.marketCapShorten}</td>
                    <td>
                      <SocialPopoverButton links={item?.links} />
                    </td>
                    <td className="text-left">{item?.launchPeriod}</td>
                    <td className="text-right">
                      <div className="flex justify-end">
                        <VoteButton variant="outlined" coin={item} sx={{ width: '100px' }} />
                      </div>
                    </td>
                  </a>
                </Link>
              ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-[#ffffff14] lg:hidden">
        {loading &&
          [...new Array(10)].map((item, i) => (
            <div className="py-2" key={i}>
              <Skeleton variant="rectangular" height={30} width="100%" />
            </div>
          ))}
        {!loading &&
          coins?.map((item, i) => (
            <div key={i}>
              <div
                className="flex cursor-pointer items-center space-x-2 py-4"
                onClick={() => handleSetIdToOpen(item?._id)}
              >
                <div className="min-w-[52px] text-[14px]">#{item.id}</div>
                <img className="h-10 w-10 rounded-md object-cover" src={item.logo} alt="" />
                <Link href={`/coin/${item.slug}`}>
                  <div className="flex-grow truncate text-[14px]">{item.name}</div>
                </Link>
                <IoIosArrowDown
                  className={
                    'transition-all' + ` ${item?._id === idToOpen ? 'rotate-180' : 'rotate-0'}`
                  }
                />
              </div>
              <div
                className={
                  'space-y-2 overflow-hidden transition-all' +
                  ` ${item?._id === idToOpen ? 'mb-4 max-h-[1000px]' : 'max-h-0'}`
                }
              >
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('price')}</p>
                  <p>${shortenNumber(item?.pricePlain)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('protocol')}</p>
                  <div className="flex justify-center gap-2">
                    {item?.chains?.map((chainInfo: any, i: number) => (
                      <div
                        className="flex min-w-max select-none items-center gap-1 rounded-full"
                        key={i}
                      >
                        <img
                          src={`/assets/icons/${chainInfo?.chain?.scanKey}.svg`}
                          alt=""
                          className="w-6 rounded-full"
                        />
                        <span className="text-14">{chainInfo?.chain?.symbol}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('change24h')}</p>
                  <div
                    className={
                      `flex justify-end gap-1` +
                      ` ${Number(item?.change24h) > 0 ? 'text-[#5BEEB9]' : ' text-[#FF4775]'}`
                    }
                  >
                    {item?.change24h < 0 ? (
                      <IoIosArrowDown className="inline" />
                    ) : (
                      <IoIosArrowUp className="inline" />
                    )}
                    {Math.abs(Number(item?.change24h || 0))}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">
                    {t('volume24h')}
                    <IoIosInformationCircleOutline className="inline text-[18px]" />
                  </p>
                  <p>${toHumanRead(Math.abs(Number(item?.volume24h)))}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('marketCap')}</p>
                  <p>${item?.marketCapShorten}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('community')}</p>
                  <SocialPopoverButton links={item?.links} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('launchDay')}</p>
                  <p>{item?.launchPeriod}</p>
                </div>
                <VoteButton variant="outlined" coin={item} fullWidth />
              </div>
            </div>
          ))}
      </div>
    </>
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
