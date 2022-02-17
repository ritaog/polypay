import * as React from 'react'
import Box from '@mui/material/Box'
import Image from 'mui-image'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import {
  Modal,
  Grid,
  Stack,
  Switch,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  ButtonGroup,
} from '@mui/material'
import { useState } from 'react'
import SchedulePostForm from '../ui/SchedulePostForm'
import SchedulePostFormFooter from '../ui/SchedulePostFormFooter'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1100px',
  height: '750px',
  minHeight: '650px',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  padding: '0px',
  outline: 'none',
  borderRadius: '25px',
  overflow: 'hidden'
}

const SchedulePostModal = ({ open, handleClose, scheduleItem, userData }) => {


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
            <Grid item xs={7} sm={7} md={7}>
              {scheduleItem ? (
                <Image
                  src={scheduleItem.photos[0]}
                  height="100%"
                  width="100%"
                  duration={0}
                  fit="fill"
                />
              ) : (
                ''
              )}
            </Grid>

            <Grid item xs={5} sm={5} md={5}>
              <div>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0}
                  sx={{ borderBottom: '1px solid lightGray' }}
                >
                  <Grid item xs={1} sm={1} md={1} sx={{ margin: '10px' }}>
                    {scheduleItem ? (
                      <Avatar
                        alt={userData.userName}
                        src={userData.photos[0]}
                      />
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid item xs={9} sm={9} md={9}>
                    <Typography align="left">
                      {scheduleItem ? scheduleItem.vendorName : ''}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={1}>
                    <IconButton
                      aria-label="delete"
                      onClick={handleClose}
                      sx={{ margin: '10px' }}
                    >
                      <CloseOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <div
                style={{
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  height: '70%',
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    <SchedulePostFormFooter children={<SchedulePostForm />} />
                  </Grid>
                </Grid>
              </div>
              {/* <Box
                sx={{
                  width: '100%',
                  padding: ' 0 20px 10px 20px',
                }}
              >
                <TextField
                  fullWidth
                  label="Description & Hashtags (optional)"
                  id="fullWidth"
                  multiline
                  rows={6}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  padding: ' 0 20px 10px 20px',
                }}
              >
                <TextField
                  fullWidth
                  label="Description & Hashtags (optional)"
                  id="fullWidth"
                  multiline
                  rows={6}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  padding: ' 0 20px 10px 20px',
                }}
              >
                <TextField
                  fullWidth
                  label="Description & Hashtags (optional)"
                  id="fullWidth"
                  multiline
                  rows={6}
                />
              </Box>
              <Box
                sx={{
                  padding: ' 0 20px 10px 20px',
                }}
              >
                <FormControlLabel
                  value="end"
                  control={<Switch color="primary" />}
                  label="Save Hashtags (pre-populates future posts)"
                  labelPlacement="end"
                />
              </Box>
              <Box>
                <ButtonGroup
                  size="large"
                  aria-label="small outlined button group"
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginRight: '20px',
                  }}
                >
                  <Typography
                    variant="h7"
                    component="span"
                    sx={{ paddingRight: '20px' }}
                  >
                    Quantity Available
                  </Typography>
                  <Button onClick={handleDecrement}>-</Button>
                  <Button>{counter}</Button>
                  <Button onClick={handleIncrement}>+</Button>
                </ButtonGroup>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginRight: '20px',
                  padding: ' 20px 20px 10px 20px',
                }}
              >
                <Typography variant="h7" sx={{ paddingRight: '20px' }}>
                  Schedule Post Time
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={postTime}
                    onChange={(newValue) => {
                      setPostTime(newValue)
                    }}
                  />
                </LocalizationProvider>
              </Box> */}
              <Box
                sx={{ borderTop: '1px solid lightGray', paddingRight: "20px", height: '100px', display: "flex", justifyContent: "flex-end", alignItems: "center" }}
              >
                <Stack spacing={2} direction="row">
                  <Button variant="text" size="large">Post Now</Button>
                  <Button variant="contained" size="large">Schedule</Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default SchedulePostModal
