import useWindowDimensions from '@/lib/hooks/useWindowDimensions'

interface ThemeWrapperProps {
  children: any
}

export default function ForceLandscapeWrapper({ children }: ThemeWrapperProps) {
  const { width, height } = useWindowDimensions()

  if (!width || !height) {
    return
  }

  return (
    <>
      {children}
      {height > width && (
        <div className="fixed inset-0 z-[9999999999] flex flex-col justify-center items-center bg-black">
          <img className="w-[80%]" src="/assets/common/rotate-device.gif" alt="" />
          <p className="text-white text-[60px] font-semibold">Please rotate your device</p>
        </div>
      )}
    </>
  )
}
