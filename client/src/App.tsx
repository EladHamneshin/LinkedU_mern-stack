import { ToastContainer } from 'react-toastify'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'



function App() {

  return (
    <Box>
    <ToastContainer />
    <Outlet />
    </Box>
  )
}

export default App
