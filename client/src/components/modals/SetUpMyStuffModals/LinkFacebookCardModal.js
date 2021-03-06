import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import FacebookLogin from 'react-facebook-login'
import { useState, useEffect } from 'react'
import '../../ui/LinkFaceBookCard.css'
import axios from 'axios'
import InstaBusAcctSetupModal from './InstaBusAcctSetupModal'
import FacebookAcctSetupModal from './FacebookAcctSetupModal'
import FacebookPageSetupModal from './FacebookPageSetupModal'
import LinkInstaToFbSetupModal from './LinkInstaToFbSetupModal'
import { IconButton } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import UnlinkAccountModal from './UnlinkAccountModal'
import LinkInBioModal from './LinkInBioModal'
import { useNavigate } from 'react-router-dom'
// import FacebookLogin from 'react-facebook-login'
    
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '750px',
  minHeight: '650px',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  padding: '10px',
  outline: 'none',
  borderRadius: '25px',
  overflow: 'hidden',
}
const styleHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
  borderBottom: "3px solid lightGray",
}
const styleHeaderAlt = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
  borderTop: "3px solid lightGray",
} 
    
    export default function LinkFacebookCardModal({ userData, handleClose, handleOpen, open }) {
      const navigate = useNavigate()
      const [dataBundle, setDataBundle] = useState()

      const responseFacebook = (response) => {
        // bundles together data from response from facebook above and userData from the users state passed down from 'app.js'
        console.log('response', response)
        let userDataBundle = {
          userData,
          response,
        }
        console.log('response', response)
        setDataBundle(userDataBundle)
      }
      useEffect(() => {
        const getData = async () => {
          console.log('userData', userData)
          const response = await axios.post('auth/validateFb', dataBundle)
          console.log('response', response)
          if (response.statusText === "OK") {
            navigate(0)
          }
        }
        if (dataBundle) {
          getData()
        }
      }, [dataBundle, userData])
    
      return (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={styleHeader}>
                <Typography id="modal-modal-title" variant="h7" component="h2">
                  Schedule Posts Directly to Instagram
                </Typography>

                <IconButton
                  aria-label="delete"
                  onClick={handleClose}
                  sx={{ margin: '10px' }}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
              <Box sx={{padding:"5px"}}> 
              <Typography id="modal-modal-title" variant="h6" component="h2">
              
              1. Do you have access to a Facebook account?  
              <FacebookAcctSetupModal/>             
              </Typography>
              <br/>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              2. Do you have a business instagram account?    
              <InstaBusAcctSetupModal/>           
              </Typography>
              <br/>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              3. Do you have a facebook page linked to your instagram account?    
              <FacebookPageSetupModal/>           
              </Typography>
              <br/>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              4. Is your instagram account linked to your facebook account?    
              <LinkInstaToFbSetupModal/>           
              </Typography>
              <br/>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              5.  Put your sales link into your bio!   
              <LinkInBioModal/>           
              </Typography>
            
              <Box sx={styleHeaderAlt}>
              <Typography id="modal-modal-title" variant="h7" component="h2">
              
              Have everything above? Click Login!                
              </Typography><br/>             
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
                instagram_manage_comments,
                instagram_manage_insights,
                pages_read_engagement,
                pages_show_list
                "
                    callback={responseFacebook}
                  />
                </Box>
                <br />
                <UnlinkAccountModal />
              </Box>
            </Box>
          </Modal>
        </div>
      )
    }
  
    


