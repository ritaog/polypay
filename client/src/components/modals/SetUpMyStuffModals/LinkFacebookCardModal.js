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

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FacebookLogin from 'react-facebook-login'
import { useState, useEffect } from 'react'
import '../../ui/LinkFaceBookCard.css'

import InstaBusAcctSetupModal from './InstaBusAcctSetupModal'
import FacebookAcctSetupModal from './FacebookAcctSetupModal'
import FacebookPageSetupModal from './FacebookPageSetupModal'
import LinkInstaToFbSetupModal from './LinkInstaToFbSetupModal'

    
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
    
    export default function LinkFacebookCardModal({ userData }) {
      const [dataBundle, setDataBundle] = useState()
      const [open, setOpen] = React.useState(false)
      const handleOpen = () => setOpen(true)
      const handleClose = () => setOpen(false)
      const navigate = useNavigate()

      const responseFacebook = (response) => {
        // bundles together data from response from facebook above and userData from the users state passed down from 'app.js'
        let userDataBundle = {
          userData,
          response,
        }
        setDataBundle(userDataBundle)
      }
      
    
      return (
        <div>
          <Button onClick={handleOpen} sx={{
          backgroundColor: '#f35275',
          color: 'white',
          '&:hover': { backgroundColor: '#6c19ff' },
        }}>Link Facebook and Instagram Accounts</Button> 
        {/* Probably don't want this a button.  not sure so will ask team */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              Schedule Posts Directly to Instagram                
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              1. Have a facebook account that you have access to   
              <FacebookAcctSetupModal/>             
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              2. Ensure that you have a business instagram account    
              <InstaBusAcctSetupModal/>           
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              3. Have a facebook page linked to your instagram account    
              <FacebookPageSetupModal/>           
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              3. Link your instagram account to your facebook account    
              <LinkInstaToFbSetupModal/>           
              </Typography>

              <FacebookLogin
              appId="2632625433548280"
              autoLoad={false}
              fields="name,email,picture"
              cssClass="FbBtn"
              scope="
                public_profile, 
                instagram_basic, 
                pages_show_list,
                pages_read_engagement, 
                ads_management, 
                business_management, 
                instagram_content_publish, 
                pages_read_engagement,
                instagram_manage_comments
                "
              // onClick={componentClicked}
              callback={responseFacebook}
            />
            </Box>
          </Modal>
        </div>
      )
    }
  
    


