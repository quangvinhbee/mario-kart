interface PanelProps {
  children?: React.ReactNode
  className?: string
}
const Panel: React.FC<PanelProps> = ({ children, className }: PanelProps) => {
  return <div className={`${className} rounded-3xl  bg-white dark:bg-[#003F50]`}>{children}</div>
}

export default Panel
