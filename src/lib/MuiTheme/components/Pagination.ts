import { Components, Theme } from '@mui/material/styles'

export default function Pagination(theme: Theme): Components {
  const darkMode = theme.palette.mode === 'dark'
  return {
    MuiPagination: {
      styleOverrides: {
        root: {
          'ul li button': {
            border: '1px solid #333333',
            borderRadius: '9999px',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            width: '36px',
            height: '36px',
            padding: 0,
            textAlign: 'center',
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            },
          },
          'ul li div': {
            border: '1px solid #333333',
            borderRadius: '9999px',
            width: '36px',
            height: '36px',
            padding: 0,
            paddingTop: '4px',
            textAlign: 'center',
          },
        },
      },
    },
  }
}
