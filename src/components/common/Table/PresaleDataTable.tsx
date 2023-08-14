import { shortenNumber } from '@/lib/helpers/utils'
import { Skeleton, Popover, IconButton } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FaDiscord,
  FaEllipsisH,
  FaGlobe,
  FaMediumM,
  FaTelegramPlane,
  FaTwitter,
} from 'react-icons/fa'
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosInformationCircleOutline,
  IoIosLink,
} from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toHumanRead } from '../../../utils/formatNumber'
import { VoteButton } from '../Button'
import { IoGlobeOutline } from 'react-icons/io5'
import SocialPopoverButton from './SocialPopoverButton'

interface PresaleDataTableProps {
  data: any[]
  onHeaderCellClick?: (field: string) => void
  [key: string]: any
}

export function PresaleDataTable({
  data,
  promote = false,
  loading = false,
  sort = {},
  onChange,
  onHeaderCellClick,
  ...props
}: PresaleDataTableProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'tableComponent' })
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
                <div className="flex items-center justify-center">{t('coin')}</div>
              </th>
              <th className="text-left font-normal">{t('platform')}</th>
              <th className="text-center font-normal">
                {t('softCap')}/{t('hardCap')}
              </th>
              <th className="text-left font-normal">{t('community')}</th>
              <th className="text-left font-normal">{t('link')}</th>
              <th className="text-left font-normal">{t('presaleDate')}</th>
              <th className="text-right font-normal">{t('upvote')}</th>
            </tr>
          </thead>
          <tbody className="text-[14px] font-normal text-gray-700 dark:text-white">
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
                      <a
                        href={item?.presaleLink}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item?.presalePlatform?._id ? (
                          <div
                            className="flex min-w-max select-none items-center gap-1 rounded-full"
                            key={i}
                          >
                            <img
                              src={item?.presalePlatform?.logo}
                              alt=""
                              className="w-6 rounded-full"
                            />
                            <span className="">{item?.presalePlatform?.name}</span>
                          </div>
                        ) : (
                          'Other'
                        )}
                      </a>
                    </td>
                    <td className="text-right">
                      {Intl.NumberFormat(undefined).format(+item?.presaleSoftCap || 0)}/
                      {Intl.NumberFormat(undefined).format(+item?.presaleHardCap || 0)}
                    </td>
                    <td>
                      <SocialPopoverButton links={item?.links} />
                    </td>
                    <td className="text-left">
                      <a
                        href={item?.presaleLink}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IconButton size="small">
                          <IoIosLink />
                        </IconButton>
                      </a>
                    </td>
                    <td className="text-left">
                      {new Date(item?.presaleStartAt).valueOf() > Date.now() ? (
                        <div className="inline-block rounded-full bg-pink-500 bg-opacity-20 px-6 py-2 font-semibold leading-none text-pink-700">
                          {t('upComing')}
                        </div>
                      ) : new Date(item?.presaleEndAt).valueOf() > Date.now() ? (
                        <div className="inline-block rounded-full bg-green-500 bg-opacity-20 px-6 py-2 font-semibold leading-none text-green-700">
                          {t('live')}
                        </div>
                      ) : (
                        <div className="inline-block rounded-full bg-purple-500 bg-opacity-20 px-6 py-2 font-semibold leading-none text-purple-700">
                          {t('ended')}
                        </div>
                      )}
                    </td>
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
                  <p className="text-[#7E7EA0]">{t('presale')}</p>
                  <a href={item?.presaleLink} target="_blank" onClick={(e) => e.stopPropagation()}>
                    {item?.presalePlatform?._id ? (
                      <div
                        className="flex min-w-max select-none items-center gap-1 rounded-full"
                        key={i}
                      >
                        <img
                          src={item?.presalePlatform?.logo}
                          alt=""
                          className="w-6 rounded-full"
                        />
                        <span className="">{item?.presalePlatform?.name}</span>
                      </div>
                    ) : (
                      'Other'
                    )}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('softCap')}</p>
                  <p>{Intl.NumberFormat(undefined).format(+item?.presaleSoftCap || 0)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('hardCap')}</p>
                  <p>{Intl.NumberFormat(undefined).format(+item?.presaleHardCap || 0)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('community')}</p>
                  <SocialPopoverButton links={item?.links} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#7E7EA0]">{t('launchDay')}</p>
                  <p>
                    {new Date(item?.presaleStartAt).valueOf() > Date.now() ? (
                      <div className="inline-block rounded-full bg-pink-500 bg-opacity-20 px-6 py-2 font-semibold leading-none text-pink-700">
                        {t('upComing')}
                      </div>
                    ) : new Date(item?.presaleEndAt).valueOf() > Date.now() ? (
                      <div className="inline-block rounded-full bg-green-500 bg-opacity-20 px-6 py-2 font-semibold leading-none text-green-700">
                        {t('live')}
                      </div>
                    ) : (
                      <div className="inline-block rounded-full bg-purple-500 bg-opacity-20 px-6 py-2 font-semibold leading-none text-purple-700">
                        {t('ended')}
                      </div>
                    )}
                  </p>
                </div>
                <VoteButton variant="outlined" coin={item} fullWidth />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
