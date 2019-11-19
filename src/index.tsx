import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff5f7f',
      main: '#ff3860',
      dark: '#b22743',
    },
    secondary: {
      light: '#4caff1',
      main: '#209cee',
      dark: '#166da6',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
);
