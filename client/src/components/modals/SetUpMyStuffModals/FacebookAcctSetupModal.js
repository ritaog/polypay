import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'



    
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
  borderBottom: "3px solid lightGray",
  borderTop: "3px solid lightGray",
}   



export default function FacebookAcctSetupModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  return (
    <div>
      <Link onClick={handleOpen}>Don't have one? Learn how! </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box sx={styleHeader}>
            <Typography id="modal-modal-title" variant="h7" component="h2">
            How do I create a Facebook account?
            </Typography>
          </Box>
          <Box sx={{padding:"5px"}}> 
            <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            1.	Go to facebook.com/r.php<br/>
            2.	Enter the name you go by in everyday life.<br/>
            3.	Enter your date of birth.<br/>
            4.	Enter your mobile phone number. To use an email instead, tap Sign up with email.<br/>
            5.	Tap Female, Male or Custom to select your gender.<br/>
            6.	Choose a password and tap Sign Up.<br/><br/>
            </Typography>
          </Box>
          <Box sx={styleHeaderAlt}>
            <Typography id="modal-modal-title" variant="h7" component="h2">
            How do I create a Facebook business account?
            </Typography>
          </Box>
          <Box sx={{padding:"5px"}}> 
            <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            1. Go to business.facebook.com/overview. <br/>
            2. Click Create Account. <br/>
            3. Enter your name, a name for your business and work email address <br/>
            and click Next. <br/>
            4.Enter your business details and click Submit.<br/>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

