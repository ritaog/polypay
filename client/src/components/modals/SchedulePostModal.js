import * as React from 'react'
import Box from '@mui/material/Box'
import {Modal, Grid, Card} from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  minWidth: '325px',
  height: '80%',
  minHeight: '650px',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  padding: '0px',
  outline: 'none',
  borderRadius: '25px',
}

const SchedulePostModal = ({open, handleClose}) => {


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item sx={8} sm={8} md={8}>
              hi
            </Grid>
            <Grid item sx={4} sm={4} md={4}>
              hi2
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default SchedulePostModal
