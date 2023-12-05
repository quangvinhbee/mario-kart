import { RacePreview } from '@/components/common/RacePreview'
import { shortenAddress } from '@/lib/helpers/utils'
import Image from 'next/image'
import Link from 'next/link'
import { NumericFormat } from 'react-number-format'
import { PlayBanner } from '../home/PlayBanner'
import axios from 'axios'
import { useEffect, useState } from 'react'

export enum RaceStatus {
  Preview,
  RaceWaiting,
  RaceRunning,
  RaceEnded,
}

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const apiURL = 'https://api.0xrace.io'
  const getLeaderboard = async () => {
    try {
      const data = await axios.get(`${apiURL}/leaderboard`)
      const leaderboard = data.data
      console.log(leaderboard)
      setLeaderboardData(leaderboard)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getLeaderboard()
  }, [])

  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="container pointer-events-none relative w-full px-[16px] pt-[40px]">
        <div className="w-[55%]">
          <PlayBanner />
        </div>
        <div className="absolute top-[40px] right-[5%] w-[40%] max-w-[487px] z-[100]">
          <div className="relative w-full">
            <Image
              className="aspect-[487/583] w-full"
              src="/assets/game/bg-dialog.png"
              alt=""
              width={487}
              height={583}
            />
            <div className="pointer-events-auto absolute top-[24%] left-[9%] right-[11%] bottom-[10%]">
              <p className="text-[17px] font-semibold">Leaderboard</p>

              <div className="mt-[40px] overflow-y-auto h-[240px] pr-[16px]">
                <div className="space-y-[24px]">
                  {leaderboardData.map((item, i) => (
                    <div className="flex items-center" key={i}>
                      <p className="flex-grow">{shortenAddress(item?.wallet || '')}</p>
                      <NumericFormat
                        displayType="text"
                        value={item?.balance || 0}
                        thousandSeparator
                      />
                      <img
                        className="ml-[8px] inline-block w-[16px]"
                        src="/assets/game/ic-coin.svg"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[24px] flex justify-end">
                <Link href={'/'} className="cursor-pointer">
                  <img
                    className="w-[104px] transition-all active:translate-y-[4px]"
                    src="/assets/game/button-back.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
