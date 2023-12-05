import { ButtonGreen } from '@/components/common/Button/ButtonGreen'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { SpinItem } from './SpinItem'

export const characterImage: Record<string, string> = {
  mario: '/assets/game/char-mario.png',
  luigi: '/assets/game/char-luigi.png',
  dk: '/assets/game/char-dk.png',
  toad: '/assets/game/char-toad.png',
  yoshi: '/assets/game/char-yoshi.png',
  goomba: '/assets/game/char-goomba.png',
  peach: '/assets/game/char-peach.png',
  coin: '/assets/game/ic-coin.svg',
}

export const SpinRacePage = () => {
  const { address } = useAccount()

  const [value, setValue] = useState(['mario', 'mario', 'mario'])
  const [isSpinning, setSpinning] = useState(true)

  const handleSpin = () => {
    if (isSpinning) {
      return
    }
    setSpinning(true)
    const characters = Object.keys(characterImage)
    const randomIndex1 = Math.floor(Math.random() * characters.length)
    const randomIndex2 = Math.floor(Math.random() * characters.length)
    const randomIndex3 = Math.floor(Math.random() * characters.length)
    setValue([characters[randomIndex1], characters[randomIndex2], characters[randomIndex3]])
    setTimeout(() => {
      setSpinning(false)
    }, 3000)
  }

  return (
    <div className="mx-auto max-w-[760px]">
      <div className="text-[26px] flex items-center">
        Price:&nbsp;<span className="text-[#BDBDBD]">(Coming soon)</span>&nbsp;
        <img className="ml-[16px] inline-block w-[36px]" src="/assets/game/ic-coin.svg" alt="" />
      </div>
      <div className="flex justify-between mt-[56px]">
        {value?.map((item, i) => (
          <div className="w-[30%]" key={i}>
            <SpinItem value={item} spin={isSpinning} />
          </div>
        ))}
      </div>
      <ButtonGreen disabled={true} className="block mx-auto w-[223px] text-[24px] mt-[40px]">
        Spin
      </ButtonGreen>
    </div>
  )
}
