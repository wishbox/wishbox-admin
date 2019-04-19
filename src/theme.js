import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import lime from '@material-ui/core/colors/lime';

const defaultTheme = createMuiTheme({})

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: lime
  }
});

export default theme
