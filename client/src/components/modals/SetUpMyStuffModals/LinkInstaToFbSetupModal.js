import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Link } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material'

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
  borderBottom: "3px solid lightGray"
}  

export default function LinkInstaToFbSetupModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Link onClick={handleOpen}>Not linked Yet? Learn how! </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      <Box sx={style}>
      <Box sx={styleHeader}>
        <Typography id="modal-modal-title" variant="h7" component="h2">
          How do I connect my Instagram account to my Facebook profile?<br/>
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={handleClose}
          sx={{ margin: '10px'}}
          style={{
          backgroundColor: "cornflowerBlue",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{padding:"5px"}}> 
          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
          You can only connect your profile from the Instagram app for Android or iOS devices<br/><br/>
          1.	Tap on your profile picture in the bottom right to go to your profile<br/>
          2.	Tap in the top right, then tap  Settings<br/>
          3.	Tap Accounts center at the bottom, then tap Set up accounts center<br/>
          4.	Tap Add Facebook account and log in or select the account you want to connect<br/>
          5.	Tap Yes, finish Setup<br/>
          6.	Select whether you want to sync your profile photo, then tap Continue<br/>
        </Typography>
      </Box>
      </Box>
      </Modal>
    </div>
  )
}





