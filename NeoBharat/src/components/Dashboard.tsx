"use client"

import type React from "react"
import { useState } from "react"
import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import Sidebar from "./Sidebar"
import SymptomForm from "./SymptomForm"
import DiagnosisResult from "./DiagnosisResult"

// Dynamically import components that might use browser-specific APIs
const DynamicHealthLibrary = dynamic(() => import("./HealthLibrary"), { ssr: false })
const DynamicTeleconsultation = dynamic(() => import("./Teleconsultation"), { ssr: false })
const DynamicUserProfile = dynamic(() => import("./UserProfile"), { ssr: false })

const Dashboard: React.FC = () => {
  const [diagnosis, setDiagnosis] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState("home")

  const handleSymptomSubmit = async (symptoms: string, language: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms, language }),
      })
      const data = await response.json()
      setDiagnosis(data.diagnosis)
    } catch (error) {
      console.error("Error getting diagnosis:", error)
      setDiagnosis("An error occurred while getting the diagnosis. Please try again.")
    }
  }

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <SymptomForm onSubmit={handleSymptomSubmit} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              {diagnosis && <DiagnosisResult diagnosis={diagnosis} />}
            </Grid>
          </Grid>
        )
      case "library":
        return <DynamicHealthLibrary />
      case "teleconsultation":
        return <DynamicTeleconsultation />
      case "profile":
        return <DynamicUserProfile />
      default:
        return null
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onNavigate={setCurrentPage} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 4 }}>
            AI Health Diagnostic Kiosk
          </Typography>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  )
}

export default Dashboard

