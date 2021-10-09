import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Bridge from './features/bridge/Bridge';
import './App.css';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#A835E1',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#101010',
      paper: '#101010',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(225,225,225,0.54)',
      disabled: 'rgba(98,98,98,0.38)',
      hint: 'rgba(199,199,199,0.38)',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '58px', width: '100%', background: 'linear-gradient(#673AAC, #A835E1);' }} />
      <Bridge />
    </ThemeProvider>
  );
}

export default App;
