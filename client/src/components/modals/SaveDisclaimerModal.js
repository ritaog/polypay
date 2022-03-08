import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Modal, Button, TextField, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '200px',
  // minHeight: '650px',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  padding: '10px',
  outline: 'none',
  borderRadius: '25px',
  overflow: 'hidden',
}
const styleHeader = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '30px',
  // borderBottom: '3px solid lightGray',
}

const SaveDisclaimerModal = ({ open, handleClose, userData }) => {
  const navigate = useNavigate()
  const [savedDisclaimer, setSavedDisclaimer] = useState('')

  const handleSave = async () => {
    const updatedUser = new FormData()
    const updateData = { ...userData, disclaimer: savedDisclaimer }
    updatedUser.append('formData', JSON.stringify(updateData))
    const response = await axios.put('/user/updateUser', updatedUser)
    if (response.statusText === 'OK') {
      navigate(0)
    }
  }

  return (
    <div>
      {' '}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={styleHeader}>
            <Typography variant="body1">
              Write out your disclaimer and save for later.
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={savedDisclaimer}
            onChange={(e) => {
              setSavedDisclaimer(e.target.value)
            }}
          />
          <Stack spacing={2} direction="row" sx={{ padding: '10px' }}>
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleClose}>back</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default SaveDisclaimerModal
