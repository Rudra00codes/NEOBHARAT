"use client"

import type React from "react"
import { useState } from "react"
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material"

interface SymptomFormProps {
  onSubmit: (symptoms: string, language: string) => void
}

const SymptomForm: React.FC<SymptomFormProps> = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState("")
  const [language, setLanguage] = useState("en")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(symptoms, language)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Describe Your Symptoms
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Language</InputLabel>
        <Select value={language} onChange={(e) => setLanguage(e.target.value as string)}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
          <MenuItem value="te">Telugu</MenuItem>
          <MenuItem value="ta">Tamil</MenuItem>
          <MenuItem value="bn">Bengali</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Get Diagnosis
      </Button>
    </Box>
  )
}

export default SymptomForm

