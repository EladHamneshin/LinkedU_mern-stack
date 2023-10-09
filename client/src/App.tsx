import { ToastContainer } from 'react-toastify'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Box, ThemeProvider } from '@mui/material'
import { useMemo } from 'react';
import { themeSettings } from './assets/theme';
import { useSelector } from 'react-redux';
import Mode from './types/Mode';
import { createTheme } from "@mui/material/styles";

function App() {
  const mode = useSelector<any, Mode>((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <ToastContainer />
        <Outlet />
      </Box>
    </ThemeProvider>
  )
}

export default App
