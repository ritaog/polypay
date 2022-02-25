import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Modal,IconButton, Button} from '@mui/material'
import Link from '@mui/material/Link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
    
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

export default function ErrorInstaAccountSetup() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Link onClick={handleOpen}>Oops!  Something went wrong!   </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={styleHeader}>
            <Typography id="modal-modal-title" variant="h7" component="h2">
              Your post was unable to reach your Instagram account<br/>
              Please make sure your accounts are all set up before you try again<br/>
              Instructions are in Accounts on the left side menu
            </Typography>       
            <Button variant= "contained">
                <IconButton onClick={handleClose} sx={{ margin: '2px'}}>
                  <ArrowBackIcon />
                </IconButton>
                </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

