import { Components, Theme } from '@mui/material/styles'

export default function Tabs(theme: Theme): Components {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: '40px',
          textTransform: 'none',
        },
        scroller: {
          display: 'inline-block',
          backgroundColor: '#2E2E60',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '9999px',
          width: 'auto',
          flex: 'none',
        },
        flexContainer: {
          position: 'relative',
          zIndex: 1,
        },
        indicator: {
          height: '100%',
          borderRadius: '9999px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: '40px',
          borderRadius: '9999px',
          textTransform: 'none',
          color: '#7E7EA0',
          '&.Mui-selected': {
            color: 'white',
          },
        },
      },
    },
  }
}
