import classNames from 'classnames/bind'
import classes from './RacePreview.module.scss'

const cx = classNames.bind(classes)

interface BackgroundProps {
  children?: React.ReactNode
  running?: boolean
}

export const Background = (props: BackgroundProps) => {
  const { children, running = true } = props

  return <div className={cx('background', running ? 'background-running' : '')}>{children}</div>
}
