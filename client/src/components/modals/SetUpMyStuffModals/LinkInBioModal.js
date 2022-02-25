import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button, Link } from '@mui/material'
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

export default function LinkInBioModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Link onClick={handleOpen}> Learn how! </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      <Box sx={style}>
      <Box sx={styleHeader}>
        <Typography id="modal-modal-title" variant="h7" component="h2">
        How do I get my link in my Bio?
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
      <Box sx={{padding:"5px"}}> 
        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
        <br/>
          1.  On the top of PolyPay, copy the storefront link<br/><br/>
          2. Go to your instagram<br/> <br/>
          3. Go to Edit Profile<br/> <br/>
          4. There are two options of where to put it...<br/><br/>
          a. If you paste the link into Website, anyone can click on it and go straignt to your sales page<br/><br/>
          b. If you paste the link into Bio, you may wand to add a note like "Paste this link into your browser to purchase items" as it will not be clickable<br/><br/>
          Now when anyone views your instagram, the link will be displayed at the top, easy for anyone to find!
        </Typography>
      </Box>
      </Box>
      </Modal>
    </div>
  )
}

