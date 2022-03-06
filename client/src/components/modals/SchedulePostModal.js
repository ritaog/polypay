import * as React from 'react'
import Image from 'mui-image'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SchedulePostForm from '../ui/SchedulePostForm'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import {
  Modal,
  Grid,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Box,
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorInstaAccountSetup from './ErrorModals/ErrorInstaAccountSetup'

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
  overflow: 'hidden',
}

const SchedulePostModal = ({ open, handleClose, scheduleItem, userData }) => {
  const navigate = useNavigate()
  const [postTitle, setPostTitle] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState(1)
  const [caption, setCaption] = useState()
  const [about, setAbout] = useState()
  const [canShip, setCanShip] = useState(false)
  const [location, setLocation] = useState()
  const [postTime, setPostTime] = useState(new Date())
  const [forSale, setForSale] = useState(false)

  const [openError, setOpenError] = useState(false)

  const [postNowLoading, setPostNowLoading] = useState(false)
  const [scheduleLoading, setScheduleLoading] = useState(false)

  const handleOpenErrorModal = () => setOpenError(true)

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleSubmit = async (postNow) => {
    const postData = {
      mediaId: scheduleItem._id,
      vendorName: scheduleItem.vendorName,
      vendorId: scheduleItem.vendorId,
      postTitle: postTitle,
      price: price,
      quantity: quantity,
      photos: scheduleItem.photos,
      description: caption,
      about: about,
      canShip: canShip,
      available: 'Scheduled',
      postTime: postTime,
      uploadTime: scheduleItem.uploadTime,
      location: location,
    }
    // shortcut to combine the response from first post and user data from user state to be sent to back end as one object
    const { instagramBusinessId, permanentToken, saleItems } = userData
    const saleItemDataBundle = {
      ...postData,
      instagramBusinessId,
      permanentToken,
      saleItems,
    }

    if (postNow) {
      setPostNowLoading(!postNowLoading)
      saleItemDataBundle.postTime = new Date()
    } else {
      setScheduleLoading(!scheduleLoading)
    }

    // second post sends combine object from above to back end to be posted to instagram and added to the users sale que
    try {
      const response = await axios.post('saleItem/schedule', saleItemDataBundle)
      if (response.statusText === 'Accepted') {
        setTimeout(() => {
          setPostNowLoading(false)
          setScheduleLoading(false)
          navigate(0)
        }, 1000)
      }
    } catch (err) {
      console.log('err', err)
      handleOpenErrorModal()
    }
  }

  const handleSubmitNoSale = async (postNow) => {
    const postData = {
      photos: scheduleItem.photos,
      description: caption,
      postTime: postTime,
      location: location,
    }

    const { instagramBusinessId, permanentToken, saleItems } = userData
    const saleItemDataBundle = {
      ...postData,
      instagramBusinessId,
      permanentToken,
      saleItems,
    }

    if (postNow) {
      setPostNowLoading(!postNowLoading)
      saleItemDataBundle.postTime = new Date()
    } else {
      setScheduleLoading(!scheduleLoading)
    }

     try {
       const response = await axios.post(
         'saleItem/scheduleNoSale',
         saleItemDataBundle
       )
       if (response.statusText === 'Accepted') {
         setTimeout(() => {
           setPostNowLoading(false)
           setScheduleLoading(false)
           navigate(0)
         }, 1000)
       }
     } catch (err) {
       console.log('err', err)
       handleOpenErrorModal()
     }
  }

  return (
    <div>
      <ErrorInstaAccountSetup open={openError} setOpen={setOpenError} />
      <Modal
        open={open}
        onClose={handleClose}
        // zIndex={0}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} zIndex={0}>
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
                  height: '610px',
                }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item sx={{ width: '100%' }}>
                    <SchedulePostForm
                      setPostTitle={setPostTitle}
                      setPrice={setPrice}
                      setQuantity={setQuantity}
                      setCaption={setCaption}
                      setAbout={setAbout}
                      setCanShip={setCanShip}
                      setLocation={setLocation}
                      setPostTime={setPostTime}
                      setForSale={setForSale}
                      handleSubmit={handleSubmit}
                      handleIncrement={handleIncrement}
                      handleDecrement={handleDecrement}
                      forSale={forSale}
                      quantity={quantity}
                      postTime={postTime}
                    />
                  </Grid>
                </Grid>
              </div>
              <Box
                sx={{
                  borderTop: '1px solid lightGray',
                  paddingRight: '20px',
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                {forSale ? (
                  <Stack spacing={2} direction="row">
                    <LoadingButton
                      variant="text"
                      size="large"
                      loading={postNowLoading}
                      disabled={
                        !postTitle || !price || !caption || !about || !location
                      }
                      startIcon={postNowLoading ? <SaveIcon /> : ''}
                      onClick={() => {
                        handleSubmit(true)
                      }}
                    >
                      Post Now
                    </LoadingButton>
                    <LoadingButton
                      variant="contained"
                      size="large"
                      loading={scheduleLoading}
                      disabled={
                        !postTitle || !price || !caption || !about || !location
                      }
                      startIcon={scheduleLoading ? <SaveIcon /> : ''}
                      onClick={() => {
                        handleSubmitNoSale(false)
                      }}
                    >
                      Schedule
                    </LoadingButton>
                  </Stack>
                ) : (
                  <Stack spacing={2} direction="row">
                    <LoadingButton
                      variant="text"
                      size="large"
                      loading={postNowLoading}
                      disabled={!caption || !location}
                      startIcon={postNowLoading ? <SaveIcon /> : ''}
                      onClick={() => {
                        handleSubmitNoSale(true)
                      }}
                    >
                      Post Now
                    </LoadingButton>
                    <LoadingButton
                      variant="contained"
                      size="large"
                      loading={scheduleLoading}
                      disabled={!caption || !location}
                      startIcon={scheduleLoading ? <SaveIcon /> : ''}
                      onClick={() => {
                        handleSubmitNoSale(false)
                      }}
                    >
                      Schedule
                    </LoadingButton>
                  </Stack>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default SchedulePostModal
