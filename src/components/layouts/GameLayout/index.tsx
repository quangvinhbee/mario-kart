import { Header } from './Header'
import { SoundButton } from './SoundButton'

export function GameLayout({ ...props }) {
  return (
    <div id="game-layout" className="w-full font-retro leading-tight">
      <Header />
      <div className="relative min-h-screen w-full">{props.children}</div>
      <SoundButton />
    </div>
  )
}
