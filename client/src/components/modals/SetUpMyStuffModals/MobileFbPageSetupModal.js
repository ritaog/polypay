import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

    
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
    


export default function MobileFbPageSetupModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  return (
    <div>
      <Link onClick={handleOpen}>Mobile </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"      >
          <Box sx={style}>
            <Box sx={styleHeader}>
              <Typography id="modal-modal-title" variant="h7" component="h2">
                Create a Facebook Page on Mobile Device<br/>
              </Typography>
            </Box>
            <Box sx={{padding:"5px"}}> 
              <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
              1.	Open your Newsfeed<br/>
              2.	Tap the Pages icon. If this tab isn't available,
               you can tap the menu icon and select Pages<br/>
              3.	Tap + Create<br/>
              4.	Tap Get Started<br/>
              5.	Add a name and up to three categories to 
              describe your Page and tap Next<br/>
              6.	You can add an address to your Page 
              to make it easier for people to 
              find your business, or tap I don't want 
              to add an address. Tap Next or
              to complete this step later, tap Skip<br/>
              7.	You can add a profile and cover photo 
              to your Page. Tap Done<br/>
              </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

