import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
// import { useNavigate } from 'react-router-dom'
import { Link } from '@mui/material'


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
// const styleHeaderAlt = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "100px",
//   borderBottom: "3px solid lightGray",
//   borderTop: "3px solid lightGray",
// }

export default function InstaAcctSetupModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // const navigate = useNavigate()

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
        How do I create an Instagram account?
        </Typography>
      </Box>
      <Box sx={{padding:"5px"}}> 
        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
          1. Go to instagram.com<br/> <br/>
          2. Tap Sign up, enter your email address, 
          create a username and password or tap Log in with Facebook to 
          sign up with your Facebook account<br/> <br/>
          3. If you register with an email, 
          tap Sign up. If you register with Facebook, you'll be prompted to 
          log into your Facebook account if you're currently logged out.<br/>
        </Typography>
      </Box>
      </Box>
      </Modal>
    </div>
  )
}

