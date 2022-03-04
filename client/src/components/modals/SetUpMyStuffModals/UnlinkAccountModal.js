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

export default function UnlinkAccountModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Link onClick={handleOpen}>Need to Unlink an Account? </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={styleHeader}>
            <Typography id="modal-modal-title" variant="h7" component="h2">
              How do I unlink my Instagram from Facebook?
            </Typography>       
            <Button variant= "contained">
                <IconButton
                  onClick={handleClose}
                  sx={{ margin: '2px'}}
                >
                  <ArrowBackIcon />
                </IconButton>
                </Button>
          </Box>
          <Box sx={{ padding: '5px' }}>
            <Typography
              id="modal-modal-description"
              variant="h6"
              sx={{ mt: 2 }}
            >
              1. Open your Facebook Page<br />
              2. Select settings from the menu<br />
              3. Select Meta Accounts Centre on the bottom left<br />
              4. Select Instagram, remove from accounts Centre<br/>
              5. Select Disconnect and confirm that you would like to remove the Instagram account. 
              <br />
              <br />
            </Typography>
          </Box>
          <Box sx={styleHeaderAlt}>
            <Typography id="modal-modal-title" variant="h7" component="h2">
              How do I unlink Facebook from third party apps?
            </Typography>
          </Box>
          <Box sx={{ padding: '5px' }}>
            <Typography
              id="modal-modal-description"
              variant="h6"
              sx={{ mt: 2 }}
            >
              1. Go to Facebook account settings <br />
              2. Click Business Integrations on the left side bar <br />
              3. Click on view and edit on the right of the app <br />
              4. Scroll down and select remove<br/>
              5. Confirm remove when the window promps you to do so
              <br />
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

