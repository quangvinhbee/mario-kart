import { RacePreview } from '@/components/common/RacePreview'
import { useMarioKart } from '@/providers/game-provider'
import { useRouter } from 'next/router'
import { NumericFormat } from 'react-number-format'

export const RewardPage = () => {
  const { userBalance } = useMarioKart()
  const router = useRouter()
  return (
    <>
      <div className="fixed inset-0">
        <RacePreview />
      </div>
      <div className="container relative flex w-full flex-wrap items-center justify-between px-[16px] pt-[100px]">
        <div className="flex w-full items-center justify-end">
          <NumericFormat
            displayType="text"
            className="text-[24px]"
            value={Number(userBalance)}
            thousandSeparator
          />
          <img className="ml-[16px] inline-block w-[36px]" src="/assets/game/ic-coin.svg" alt="" />
        </div>
        <div className="w-[40%]">
          <img
            data-aos="zoom-in"
            className="mx-auto max-w-[440px]"
            src={'/assets/game/frame-mario-win.png'}
            alt=""
          />
        </div>
        <div className="w-[55%]">
          <p className="text-[24px]">Your rewards</p>
          <div className="mt-[8px] flex items-center space-x-[24px]">
            <div className="relative w-full max-w-[256px]">
              <img className="aspect-[257/93] w-full" src="/assets/game/frame-input.png" alt="" />
              <div className="absolute inset-x-[12%] inset-y-[18%] flex items-center justify-end">
                <NumericFormat
                  displayType="text"
                  className="text-right font-retro text-[24px] outline-none placeholder:text-black"
                  value={100}
                  thousandSeparator
                />
                <img
                  className="ml-[16px] inline-block w-[36px]"
                  src="/assets/game/ic-coin.svg"
                  alt=""
                />
              </div>
            </div>
            <img
              className="animate-move-down-up mx-auto mt-[32px] max-w-[337px] cursor-pointer"
              src="/assets/game/button-play.png"
              alt=""
              onClick={() => {
                router.push('/play')
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
