import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Link } from '@mui/material'
import InstaAcctSetupModal from './InstaAcctSetupModal'
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
  borderBottom: "3px solid lightGray",
}

export default function InstaBusAcctSetupModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
        How do I create an Instagram business account?
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
            First you must have an Instagram account<br/>
            <InstaAcctSetupModal/><br/>
            To switch your profile to a business account:<br/>
            1.  Go to your profile and tap the menu         
            in the upper right corner<br/>
            2.  Tap Settings - some accounts the switch to professional account option<br/>
            will be listed directly under settings<br/>
            3.  Tap Account.  Tap Switch to Professional Account. Tap Continue<br/>
            4.  Select a category for your busisess and tap Done.  Tap OK to confirm<br/>
            5.  Tap Business.  Tap Next.  Add your contact details and tap Next  
            or tap don't use my contact info to skip this step <br/>  
            6.  12.	Tap X on the top right corner to return to your profile
        </Typography>
      </Box>
      </Box>
      </Modal>
    </div>
  )
}

