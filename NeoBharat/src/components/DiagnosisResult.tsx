"use client"

import type React from "react"
import { Paper, Typography, Box } from "@mui/material"

interface DiagnosisResultProps {
  diagnosis: string
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ diagnosis }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Diagnostic Result
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {diagnosis}
      </Typography>
      <Box sx={{ bgcolor: "#f0f0f0", p: 2, borderRadius: 1 }}>
        <Typography variant="caption" color="textSecondary">
          Disclaimer: This is an AI-generated diagnosis and should not be considered as professional medical advice.
          Please consult with a healthcare professional for accurate diagnosis and treatment.
        </Typography>
      </Box>
    </Paper>
  )
}

export default DiagnosisResult

