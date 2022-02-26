import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import { Typography, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import AccordionButton from './AccordionButton'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import SignUpButton from '../modals/SignUpModal'
import Image from 'mui-image'
// import logo from 'images/polypay_armadillo.png'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SalePageLink from '../ui/SalePageLink'
const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer({ children, userData, getUserState }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const [expanded, setExpanded] = React.useState()


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
    handleDrawerClose()
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSignOut = async () => {
    setAnchorElUser(null)

    let logout = await axios.get('auth/logout')
    console.log('Trying to logout', logout)
    getUserState(null)
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>
          <Box sx={{ paddingRight: '10px' }}>
            <Image
              src="images/polypay_armadillo.png"
              alt="logo"
              height="50px"
              width="50px"
              fit="fill"
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: 'black', paddingRight: '10px', fontSize: '30px' }}
          >
            PolyPay
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button href="/" sx={{ my: 2, color: 'black', display: 'block' }}>
              Home
            </Button>
            <Button sx={{ my: 2, color: 'black', display: 'block' }}>
              About
            </Button>
            <Button sx={{ my: 2, color: 'black', display: 'block' }}>
              Blog
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {userData ? <SalePageLink userData={userData} /> : ''}
            </Box>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {userData ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Name"
                    src={userData?.photos?.[0] || '/static/images/avatar/2.jpg'}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <SignUpButton getUserState={getUserState} />
            )}

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={Link}
                href="/profile"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem component={Link} href="/" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem component={Button} onClick={handleSignOut}>
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleChange('panel2')}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <AccordionButton
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleChange={handleChange}
              setExpanded={setExpanded}
              expanded={expanded}
              userData={userData}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: ' #b7e7fa' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
