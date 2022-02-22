import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EditPostForm from '../ui/EditPostForm'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import Image from 'mui-image'
import {
  Modal,
  Grid,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material'
import CancelPostModal from './CancelPostModal'
import RemovePostModal from './RemovePostModal'

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

const PostInfoModal = ({
  open,
  handleClose,
  handleEdit,
  editDisabled,
  submitDisabled,
  postInfo,
  userData,
}) => {
  const navigate = useNavigate()
  const [postTitle, setPostTitle] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [caption, setCaption] = useState()
  const [about, setAbout] = useState()
  const [canShip, setCanShip] = useState()
  const [location, setLocation] = useState()
  const [postTime, setPostTime] = useState()
  const [posted, setPosted] = useState()

  const [editLoading, setEditLoading] = useState(false)

  const [openCancelPostModal, setOpenCancelPostModal] = React.useState(false)
  const handleOpenCancelModal = () => {
    setOpenCancelPostModal(true)
  }
  const handleCloseCancelModal = () => {
    setOpenCancelPostModal(false)
  }

  const [openRemovePostModal, setOpenRemovePostModal] = React.useState(false)
  const handleOpenRemoveModal = () => {
    setOpenRemovePostModal(true)
  }
  const handleCloseRemoveModal = () => {
    setOpenRemovePostModal(false)
  }

  useEffect(() => {
    const populateModal = () => {
      setPostTitle(postInfo.postTitle)
      setPrice(postInfo.price.$numberDecimal)
      setQuantity(postInfo.quantity)
      setCaption(postInfo.description)
      setAbout(postInfo.about)
      setCanShip(postInfo.canShip)
      setLocation(postInfo.location)
      setPostTime(postInfo.postTime)
      if (postInfo.available === 'Posted') {
        setPosted(true)
      } else {
        setPosted(false)
      }
    }
    if (postInfo) {
      populateModal()
    }
  }, [postInfo])

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleSubmit = async () => {
    setEditLoading(true)
    const postData = {
      id: postInfo._id,
      vendorName: postInfo.vendorName,
      vendorId: postInfo.vendorId,
      postTitle: postTitle,
      price: price,
      quantity: quantity,
      photos: postInfo.photos,
      description: caption,
      about: about,
      canShip: canShip,
      available: 'Scheduled',
      location: location,
    }

    // second post sends combine object from above to back end to be posted to instagram and added to the users sale que
    const response = await axios.put(
      `saleItem/editSchedule/${postInfo._id}`,
      postData
    )
    if (response.statusText === 'Accepted') {
      navigate(0)
    }
  }

  const handleCancelPost = async () => {
    const response = await axios.delete(
      `saleItem/cancelSchedule/${postInfo._id}`
    )
    if (response.statusText === 'No Content') {
      setEditLoading(false)
      navigate(0)
    }
  }

  return (
    <div>
      <CancelPostModal
        handleOpen={handleOpenCancelModal}
        handleClose={handleCloseCancelModal}
        handleCancelPost={handleCancelPost}
        openCancelPostModal={openCancelPostModal}
      />
      <RemovePostModal
        handleOpen={handleOpenRemoveModal}
        handleClose={handleCloseRemoveModal}
        handleCancelPost={handleCancelPost}
        openRemovePostModal={openRemovePostModal}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={7} sm={7} md={7}>
              {postInfo ? (
                <Image
                  src={postInfo.photos[0]}
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
                    {postInfo ? (
                      <Avatar
                        alt={userData.userName}
                        src={userData.photos[0]}
                      />
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid item xs={9} sm={9} md={9} sx={{ display: 'flex' }}>
                    <Typography>
                      {postInfo ? `Status: ${postInfo.available}` : ''}
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
                  <Grid item>
                    <EditPostForm
                      setPostTitle={setPostTitle}
                      postTitle={postTitle}
                      setPrice={setPrice}
                      price={price}
                      setQuantity={setQuantity}
                      quantity={quantity}
                      setCaption={setCaption}
                      caption={caption}
                      setAbout={setAbout}
                      about={about}
                      setCanShip={setCanShip}
                      canShip={canShip}
                      setLocation={setLocation}
                      location={location}
                      setPostTime={setPostTime}
                      postTime={postTime}
                      handleSubmit={handleSubmit}
                      handleIncrement={handleIncrement}
                      handleDecrement={handleDecrement}
                      edit={editDisabled}
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
                <Stack spacing={2} direction="row">
                  {posted ? (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleOpenRemoveModal}
                    >
                      Remove Post
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleOpenCancelModal}
                    >
                      Cancel Post
                    </Button>
                  )}

                  <Button
                    size="large"
                    disabled={!submitDisabled}
                    onClick={handleEdit}
                  >
                    Edit Post
                  </Button>
                  <LoadingButton
                    variant="contained"
                    disabled={submitDisabled}
                    loading={editLoading}
                    // loadingPosition="start"
                    startIcon={editLoading ? <SaveIcon /> : ''}
                    onClick={handleSubmit}
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}

export default PostInfoModal
