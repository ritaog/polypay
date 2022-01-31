import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PhotoIcon from '@mui/icons-material/Photo'

import { useNavigate } from 'react-router-dom'

import ResponsiveAppBar from './ResponsiveAppBar'

const drawerWidth = 240

export default function ClippedDrawer({ userData, getUserState, children }) {
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <ResponsiveAppBar userData={userData} getUserState={getUserState} />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem
              button
              onClick={() => {
                navigate('/linkaccounts')
              }}
            >
              <AccountBoxIcon />
              <ListItemText
                primary="Link Profiles"
                sx={{ paddingLeft: '10px' }}
              />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                navigate('/schedulepost')
              }}
            >
              <ScheduleIcon />
              <ListItemText
                primary="Schedule Post"
                sx={{ paddingLeft: '10px' }}
              />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                navigate('/portfolio')
              }}
            >
              <PhotoIcon />
              <ListItemText 
                primary="View All" 
                sx={{ paddingLeft: '10px' }} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {['Posts', 'Sales', 'Messages', 'Account', 'Help'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
