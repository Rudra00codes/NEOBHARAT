"use client"

import type React from "react"
import { useState } from "react"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import dynamic from "next/dynamic"
import Login from "./components/Login"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#388e3c",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
})

// Dynamically import the Dashboard component with SSR disabled
const DynamicDashboard = dynamic(() => import("./components/Dashboard"), {
  ssr: false,
})

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? <DynamicDashboard /> : <Login onLogin={handleLogin} />}
    </ThemeProvider>
  )
}

export default App

