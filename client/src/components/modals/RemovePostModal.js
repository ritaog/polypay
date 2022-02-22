import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

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

const RemovePostModal = ({
  handleClose,
  openRemovePostModal,
  handleCancelPost,
}) => {
  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        open={openRemovePostModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Remove Post</h2>
          <p id="child-modal-description">
            This will only delete the post on your calender and the payment page. Posts must be removed directly from instagram
          </p>
          <Button color="error" variant="outlined" onClick={handleCancelPost}>
            Delete Post
          </Button>
          <Button  variant="contained" onClick={handleClose} sx={{marginLeft: '10px'}}>
            Back
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default RemovePostModal
