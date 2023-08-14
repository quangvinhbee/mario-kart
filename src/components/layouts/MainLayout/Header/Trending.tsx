import { useEffect, useRef, useState } from 'react'
import Marquee from 'react-fast-marquee'
import axios from 'axios'
import Lottie from 'lottie-react'
import CoinApi from '@/services/coin.api'
import { shortenNumber } from '@/lib/helpers/utils'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { FaFire } from 'react-icons/fa'

const Trending = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'mainLayout' })
  const [trendingCoins, setTrendingCoins] = useState([])

  useEffect(() => {
    const getTrendingCoin = async () => {
      const res = await CoinApi.getCoins({ pageSize: 50, sortBy: 'trending' })
      setTrendingCoins(res?.data?.filter((item: any) => +item?.trending > 0))
    }
    getTrendingCoin()
    const interval = setInterval(() => {
      getTrendingCoin()
    }, 3 * 60 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="hidden items-center space-x-2 lg:flex">
      {/* <Lottie animationData={'../../../../lib/animation/rocket.json'} loop /> */}
      <h2 className="mr-[32px] flex items-center text-[14px] font-bold text-[#5BEEB9]">
        <FaFire className="mr-1 text-20" />
        {t('trending')}
      </h2>
      <div className="w-[280px] xl:w-[560px] 2xl:w-[800px]">
        {trendingCoins.length > 0 && (
          <Marquee gradient={false} play pauseOnHover>
            {trendingCoins.map((item, i) => (
              <Link href={`/coin/` + item.slug}>
                <div className="mx-2 flex h-11 cursor-pointer items-center space-x-2 rounded-lg bg-[#dadbde] bg-opacity-25 px-3 py-1 text-[14px] font-semibold dark:bg-[#11112C]">
                  <span className="text-[#9570FF]">#{i + 1}</span>
                  <img src={item?.logo} alt="" className="w-[20px] rounded-full" />

                  <div className="ml-2 flex flex-col text-xs">
                    <span className="">{item?.symbol}</span>
                    {/* <div className="text-[12px]">${shortenNumber(item?.pricePlain)}</div> */}
                    <span
                      className={`flex items-center gap-1 text-right text-[12px] ${
                        +item?.trending >= 0 ? 'text-[#5BEEB9]' : ' text-[#FF4775]'
                      }`}
                    >
                      {+item?.trending < 0 ? (
                        <IoIosArrowDown className="inline" />
                      ) : (
                        <IoIosArrowUp className="inline" />
                      )}
                      {Intl.NumberFormat(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }).format(+item?.trending || 0)}
                      %
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </Marquee>
        )}
      </div>
    </div>
  )
}

export default Trending
