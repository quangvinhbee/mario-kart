import { Components, Theme } from '@mui/material/styles'

export default function Button(theme: Theme): Components {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '40px',
          borderRadius: '10px',
          textTransform: 'none',
          [theme.breakpoints.up(1900)]: {
            height: '48px',
            borderRadius: '12px',
          },
        },
      },
    },
  }
}
