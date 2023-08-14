import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface ThemeWrapperProps {
  children: any
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const theme = useSelector((store: any) => store?.SettingCommonSlice.theme)

  useEffect(() => {
    if (typeof window != 'undefined') {
      const htmlElement = document.querySelector('html')
      if (htmlElement && theme) {
        htmlElement.classList.value = ''
        htmlElement.classList?.add(theme)
      }
    }
  }, [theme])

  return <>{children}</>
}
