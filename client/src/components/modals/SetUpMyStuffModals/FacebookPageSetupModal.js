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
    


      export default function FacebookPageSetupModal() {
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
          }}>How do I setup my Facebook Page</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Create a Facebook Page for Your Business<br/>
                Before you begin<br/>
                1.  Across the Meta family of apps. At this time, 
                only one Facebook Page can be connected to your business account.<br/>
                2.	You must have a Facebook profile.<br/>
                <br/>
                To create a Page for your business using your mobile device:<br/>
                1.	Open your Newsfeed.<br/>
                2.	Tap the Pages icon.<br/>
                •	If this tab isn't available, you can tab the menu icon and select Pages.<br/>
                3.	Tap + Create.<br/>
                4.	Tap Get Started.<br/>
                5.	Add a name and up to three categories to describe your Page and tap Next.<br/>
                •	Learn more about selecting a category for your Page.<br/>
                6.	You can add an address to your Page to make it easier for people to 
                find your business, or tap I don't want to add an address. Tap Next. 
                To complete this step later, tap Skip.<br/>
                7.	You can add a profile and cover photo to your Page. Tap Done.<br/>
                <br/>
                To create a Page for your business using your desktop computer:<br/>
                1.	Open your Facebook profile.<br/>
                2.	At the top of the homepage, select Create and choose Page.<br/>
                3.	Name your Page.<br/>
                4.	Add a category to describe your Page.<br/>
                •	Learn more about selecting a category for your Page.<br/>
                5.	Enter business information, such as address and contact information.<br/>
                6.	Select Continue<br/>
                7.	You can add a profile photo to your Page. If you add a photo, 
                select Next. To complete this step later, select Skip.<br/>
                8.	You can add a cover photo to your Page. If you add a photo, 
                select Next. To complete this step later, select Skip.<br/>
                9.	When you have completed the steps, select Next to go to your new Page.<br/>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
              </Box>
            </Modal>
          </div>
        )
      }

