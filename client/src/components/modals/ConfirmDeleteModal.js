import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '25px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const ConfirmDeleteModal = ({
  handleClose,
  openConfirmDeleteModal,
  selectedPhoto
}) => {
  console.log('selectedPhoto', selectedPhoto)
  const handleDelete = async () => {
    const response = await axios.delete(`/media/deleteImageById/${selectedPhoto._id}`)
    console.log('response', response)
  }
  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        open={openConfirmDeleteModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Delete Selected Image?</h2>

          <Button color="error" variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ marginLeft: '10px' }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default ConfirmDeleteModal