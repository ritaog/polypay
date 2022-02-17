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
    

      export default function LinkInstaToFbSetupModal() {
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
          }}>How do I Link my Instagram to my Facebook</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                How do I connect my Instagram account to my Facebook profile?<br/>
                You can only connect your profile from the Instagram app for Android or iOS devices.<br/>
                1.	Tap   or your profile picture in the bottom right to go to your profile.<br/>
                2.	Tap   in the top right, then tap  Settings.<br/>
                3.	Tap Accounts center at the bottom, then tap Set up accounts center.<br/>
                4.	Tap Add Facebook account and log in to or select the account you want to connect.<br/>
                5.	Tap Yes, finish Setup.<br/>
                6.	Select whether you want to sync your profile photo, then tap Continue.<br/>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
              </Box>
            </Modal>
          </div>
        )
      }





