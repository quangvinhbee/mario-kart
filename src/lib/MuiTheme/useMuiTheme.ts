import {
  ThemeOptions,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import componentsOverrides from './components'

export const muiThemeOption: ThemeOptions = {
  palette: {
    primary: {
      main: '#9570FF',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
}

export default function useMuiTheme() {
  const theme = useSelector((store: any) => store?.SettingCommonSlice.theme)
  const [muiTheme, setMuiTheme] = useState(createMuiTheme(muiThemeOption))

  const handleCreateMuiTheme = () => {
    muiThemeOption.palette.mode = theme
    const newMuiTheme = createMuiTheme(muiThemeOption)
    newMuiTheme.components = componentsOverrides(newMuiTheme)
    setMuiTheme(newMuiTheme)
  }

  useEffect(() => {
    handleCreateMuiTheme()
  }, [theme])

  return muiTheme
}
