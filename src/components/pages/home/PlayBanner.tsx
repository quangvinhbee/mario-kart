import Image from 'next/image'
import Link from 'next/link'

export const PlayBanner = () => {
  return (
    <div className="mx-auto w-full max-w-[645px]">
      <Image className="" src="/assets/game/banner.png" alt="" width={646} height={432} />
      <div className="pointer-events-auto translate-y-[-85%]">
        <Link href="/play">
          <img
            className="animate-move-down-up mx-auto w-full max-w-[337px] cursor-pointer"
            src="/assets/game/button-play.png"
            alt=""
          />
        </Link>
        <Link
          href="/how-to-play"
          className="mt-[4px] block text-center uppercase underline underline-offset-2"
        >
          How to play
        </Link>
      </div>
    </div>
  )
}
