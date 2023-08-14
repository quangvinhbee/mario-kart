import { Components, Theme } from '@mui/material/styles'

export default function Label(theme: Theme): Components {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: '#EFEFEF',
          '&.Mui-focused': {
            color: '#EFEFEF',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#EFEFEF',
            '&.Mui-focused': {
              color: '#EFEFEF',
            },
          },
        },
      },
    },
  }
}
