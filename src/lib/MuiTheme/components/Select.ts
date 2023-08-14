import { Components, Theme } from '@mui/material/styles'

export default function Select(theme: Theme): Components {
  return {
    MuiSelect: {
      styleOverrides: {
        outlined: {
          height: '25px',
          [theme.breakpoints.up(1900)]: {
            height: '31px',
          },
        },
        nativeInput: {
          opacity: 1,
          border: 'none',
          color: 'transparent',
          background: 'transparent',
          top: '50%',
          bottom: 'auto',
          transform: 'translate(0, -50%)',
          paddingLeft: 12,
          '::placeholder': {
            opacity: 1,
            color: '#bbb',
          },
        },
      },
    },
  }
}
