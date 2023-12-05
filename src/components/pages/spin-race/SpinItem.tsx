import { FC, useEffect, useState } from 'react'
import { characterImage } from '.'

interface ISpinItemProps {
  value: string
  spin: boolean
}

export const SpinItem: FC<ISpinItemProps> = (props) => {
  const { value, spin } = props
  const [character, setCharacter] = useState(value)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (spin) {
      interval = setInterval(() => {
        const characters = Object.keys(characterImage)
        const randomIndex = Math.floor(Math.random() * characters.length)
        console.log(randomIndex)
        setCharacter(characters[randomIndex] || value)
      }, 70)
    } else {
      setCharacter(value)
    }

    return () => {
      clearInterval(interval)
    }
  }, [spin])

  const image = characterImage[character]

  return (
    <div className="relative aspect-1">
      <img className="w-full" src="/assets/game/frame-character.svg" alt="" />
      <img className="absolute w-[50%] top-[25%] left-[25%]" src={image} alt="" />
    </div>
  )
}
