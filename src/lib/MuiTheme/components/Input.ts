import { Components, Theme } from '@mui/material/styles'

export default function Input(theme: Theme): Components {
  const darkMode = theme.palette.mode === 'dark'
  return {
    MuiInputBase: {
      styleOverrides: {
        inputSizeSmall: {
          height: '25px',
          [theme.breakpoints.up(1900)]: {
            height: '31px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: darkMode ? '#FFF' : '#FFF',
          backgroundColor: darkMode ? '#2E2E60' : '#2E2E60',
          borderRadius: '10px',
          [theme.breakpoints.up(1900)]: {
            borderRadius: '12px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.1) !important',
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          },
          '&.Mui-error': {
            backgroundColor: '#FFE4E9',
          },
        },
      },
    },
  }
}
