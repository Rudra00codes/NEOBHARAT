"use client"

import type React from "react"
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Home, LocalHospital, VideoCall, Person } from "@mui/icons-material"

const drawerWidth = 240

interface SidebarProps {
  onNavigate: (page: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          CSC Health Kiosk
        </Typography>
      </Toolbar>
      <List>
        <ListItem button onClick={() => onNavigate("home")}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => onNavigate("library")}>
          <ListItemIcon>
            <LocalHospital />
          </ListItemIcon>
          <ListItemText primary="Health Library" />
        </ListItem>
        <ListItem button onClick={() => onNavigate("teleconsultation")}>
          <ListItemIcon>
            <VideoCall />
          </ListItemIcon>
          <ListItemText primary="Teleconsultation" />
        </ListItem>
        <ListItem button onClick={() => onNavigate("profile")}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar

