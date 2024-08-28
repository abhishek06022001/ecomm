import React from 'react'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import MainPages from './MainPages'
import { BrowserRouter, Router } from "react-router-dom";
import { DataProvider } from './GlobalState';
import { createTheme, ThemeProvider } from '@mui/material';


function App() {
  return (

    <DataProvider>
      <BrowserRouter>
        <ResponsiveAppBar />
        <MainPages />
      </BrowserRouter>
    </DataProvider>

  )
}
export default App