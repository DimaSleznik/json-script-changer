import {createTheme} from '@mui/material';

export default createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        input: {
          paddingTop: '2px !important',
          paddingBottom: '2px !important'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: '#05ACEE !important',
          color: '#05ACEE !important'
        }
      }
    },
    MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: '#05ACEE !important',
            color: '#05ACEE !important'
          },
          root: {
            borderColor: '#05ACEE !important',
            color: '#05ACEE !important'
          }
        }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: 'inherit !important',
          borderColor: "#05ACEE !important",
          color: '#05ACEE !important',
          padding: '2px 8px !important'
        }
      }
    }
  }
});