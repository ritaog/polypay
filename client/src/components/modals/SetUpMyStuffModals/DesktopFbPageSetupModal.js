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
    


export default function DesktopFbPageSetupModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  return (
    <div>
    <Link onClick={handleOpen}>Desktop </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Box sx={styleHeader}>
              <Typography id="modal-modal-title" variant="h7" component="h2">
                Create a Facebook Page on Desktop<br/>
              </Typography>
            </Box>
            <Box sx={{padding:"5px"}}> 
              <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>         
              1.	Open your Facebook profile<br/>
              2.	At the top of the homepage, select Create and choose Page<br/>
              3.	Name your Page<br/>
              4.	Add a category to describe your Page<br/>
              5.	Enter your business information, address and contact information<br/>
              6.	Select Continue<br/>
              7.	You can add a profile photo to your Page. If you add a photo, 
              select Next or select Skip to complete later<br/>
              8.	You can add a cover photo to your Page. If you add a photo, 
              select Next or Select Skip to complete later<br/>
              9.	When you have completed the steps, select Next to go to your new Page<br/>
              </Typography>
            </Box>
          </Box>
      </Modal>
    </div>
  )
}

