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
    
    



    export default function FacebookAcctSetupModal() {
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
          }}>How do I setup my Facebook Account</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                How do I create a Facebook account?<br/>
                1.	Go to facebook.com/r.php.<br/>
                2.	Enter the name you go by in everyday life.<br/>
                3.	Enter your date of birth.<br/>
                4.	Enter your mobile phone number. To use an email instead, tap Sign up with email.<br/>
                5.	Tap Female, Male or Custom to select your gender.<br/>
                6.	Choose a password and tap Sign Up.<br/>
                How do I create a Facebook business account?<br/>
                Go to business.facebook.com/overview. Click Create Account. 
                Enter a name for your business, your name and work email address 
                and click Next. Enter your business details and click Submit.

                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
              </Box>
            </Modal>
          </div>
        )
      }

   