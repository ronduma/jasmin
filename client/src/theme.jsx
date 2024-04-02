import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({      
  palette: {
    beige: {
      main: '#F2F0E1'
    },
    green: {
      main: '#005241'
    },
    white: {
      main: '#FFFFFF'
    }
  },
  typography: {
    button: {
      color: '#005241',
      fontSize: '14pt',
      fontWeight: '400',
      textTransform: 'none'
    },
    navLink: {
      color: '#005241'
    },
    fontFamily : `"Nunito Sans", sans-serif`
  }
});

theme = responsiveFontSizes(theme);

export default theme;