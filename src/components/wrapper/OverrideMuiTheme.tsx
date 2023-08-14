import useMuiTheme from '@/lib/MuiTheme/useMuiTheme'
import { ThemeProvider } from '@mui/material/styles'

interface OverrideMuiThemeProps {
  children: any
}

export default function OverrideMuiTheme({ children }: OverrideMuiThemeProps) {
  const muiTheme = useMuiTheme()

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
}
