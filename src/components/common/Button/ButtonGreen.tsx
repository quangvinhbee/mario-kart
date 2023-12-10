import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type IButtonGreenProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  className?: string
}

export const ButtonGreen: FC<IButtonGreenProps> = (props) => {
  const { children, className, ...other } = props

  return (
    <button
      className={twMerge(
        'aspect-[223/72] w-[108px] bg-[url(/assets/game/button-green.svg)] bg-no-repeat bg-contain text-[12px] font-retro cursor-pointer transition-all active:translate-y-[2px] disabled:opacity-60 disabled:active:translate-y-0 disabled:cursor-default',
        className
      )}
      {...other}
    >
      {children}
    </button>
  )
}
