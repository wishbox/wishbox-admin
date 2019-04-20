import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import lime from '@material-ui/core/colors/lime';

const defaultTheme = createMuiTheme({})

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: lime,
    text: Object.assign({}, defaultTheme.palette.text, {primary: 'rgba(0,0,0,.66)'})
  },

  typography: {
    fontFamily: [
      // 'Montserrat',
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

  overrides: {
    MuiTypography: {
      h4: {
        fontFamily: 'Montserrat',
        fontWeight: 700,
        letterSpacing: '.013ex'
      }
    },
    MuiInputBase: {
      root: {
        background: 'white'
      }
    }
  }
});

export default theme
