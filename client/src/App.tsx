import './App.css'
import Router from './routes/Router';
import Button from '@mui/material/Button';
import {BrowserRouter } from "react-router-dom";


function App() {

  return (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
  )
}

export default App
