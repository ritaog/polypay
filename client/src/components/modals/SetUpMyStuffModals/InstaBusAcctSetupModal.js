import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useState } from 'react'

    
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }
    
    export default function InstaBusAcctSetupModal() {
      const [open, setOpen] = React.useState(false)
      const handleOpen = () => setOpen(true)
      const handleClose = () => setOpen(false)
      const navigate = useNavigate()
    
      return (
        <div>
          <Button onClick={handleOpen} sx={{
          backgroundColor: '#f35275',
          color: 'white',
          '&:hover': { backgroundColor: '#6c19ff' },
        }}>How do I setup my Instagram Business Account</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              How do I create an Instagram account?<br/>
                Go to instagram.com. Tap Sign up, enter your email address, 
                create a username and password or tap Log in with Facebook to 
                sign up with your Facebook account. If you register with an email, 
                tap Sign up. If you register with Facebook, you'll be prompted to 
                log into your Facebook account if you're currently logged out.<br/>
            How do I create an Instagram business account?<br/>
                On Instagram, you can convert your personal profile to a business account 
                to access features that can help you grow your business.
                To switch your profile to a business account:<br/>
                1.  Go to your profile and tap the icon of three horizontal lines<br/>
  {/* need to add the hamburger logo here  */}              
                in the upper right corner.<br/>
                2.  Tap Settings - some accounts the switch to professional account option<br/>
                will be listed directly under settings.<br/>
                3.  Tap Account.  Tap Switch to Professional Account. Tap Continue.<br/>
                4.  Select a category for your busisess and tap Done.  Tap OK to confirm.<br/>
                5.  Tap Business.  Tap Next.  Add your contact details and tap Next.  <br/>
                Or tap don't use my contact info to skip this step. <br/>  
                6.  12.	Tap X on the top right corner to return to your profile.
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </div>
      )
    }

