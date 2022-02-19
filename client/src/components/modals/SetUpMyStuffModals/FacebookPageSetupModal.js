import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MobileFbPageSetupModal from './MobileFbPageSetupModal'
import DesktopFbPageSetupModal from './DesktopFbPageSetupModal'
    
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
    


export default function FacebookPageSetupModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  return (
    <div>
      <Link onClick={handleOpen}>No page or not linked yet?  Learn how!</Link>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={styleHeader}>
              <Typography id="modal-modal-title" variant="h7" component="h2">
                Create a Facebook Page for Your Business<br/>
              </Typography>
            </Box>
            <Box sx={{padding:"5px"}}> 
              <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>

              Before you begin<br/>
              1. You must have a Facebook profile <br/>
              2. At this time, Meta will only allow one Facebook Page 
              to be connected to your business account.<br/><br/>

              Are you using a mobile Device?<br/>
              <MobileFbPageSetupModal/><br/><br/>

              Are you using a desktop?<br/>
              <DesktopFbPageSetupModal/>
              </Typography>
            </Box>
          </Box>
        </Modal>
    </div>
  )
}

