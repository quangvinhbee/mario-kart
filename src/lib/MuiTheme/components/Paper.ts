import { Components, Theme } from '@mui/material/styles'

export default function Paper(theme: Theme): Components {
  const darkMode = theme.palette.mode === 'dark'
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: darkMode ? '#1B1B44' : '#FFF',
        },
      },
    },
  }
}
