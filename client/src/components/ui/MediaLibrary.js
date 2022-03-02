import React from 'react'
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Button,
  Box,
  IconButton,
} from '@mui/material'

import Image from 'mui-image'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import DeleteIcon from '@mui/icons-material/Delete'
import InstagramIcon from '@mui/icons-material/Instagram'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SchedulePostModal from '../modals/SchedulePostModal'
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal'

const MediaLibrary = ({ userData }) => {
  const navigate = useNavigate()
  const [saleItems, setSaleItems] = useState([])
  const [scheduleItem, setScheduleItem] = useState()
  const [selectedPhoto, setSelectedPhoto] = useState()

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
  const handleCloseConfirmDeleteModal = () => setOpenConfirmDeleteModal(false)

  useEffect(() => {
    const getMediaByLoggedUser = async () => {
      const response = await axios.get('/media/listImagesByLoggedUser')
      response.data.sort(function (a, b) {
        return new Date(b.postTime) - new Date(a.postTime)
      })
      setSaleItems(response.data)
    }
    if (userData) {
      getMediaByLoggedUser()
    }
  }, [userData])

  const handlePhotoUpload = async (e) => {
    // assigns a new form data constructor to append data to to send to back end. 'image' is file selected by user to be uploaded to instagram
    // "formData" is all the data collected from the schedule post form to be sent to back end

    console.log('uploadPhoto', e.target.files[0])
    console.log(userData.permanentToken)

    const postData = {
      vendorName: userData?.userName,
      vendorId: userData?._id,
      photos: [],
      uploadTime: new Date(),
      postedTo: [],
    }

    const imageData = new FormData()
    imageData.append('image', e.target.files[0])
    imageData.append('formData', JSON.stringify(postData))

    // first post sends photo file and form data to back end. response is the compiled sale item object with image url from cloudinary
    const responseUpload = await axios.post('/media/upload', imageData)
    if (responseUpload) {
      navigate(0)
    }
  }

  const handleDeletePhoto = async (item) => {
    setSelectedPhoto(item)
    setOpenConfirmDeleteModal(true)
  }

  const handlePostSchedule = (item) => {
    // if (userData.permanentToken) {
      setScheduleItem(item)
      setOpen(true)
      console.log('schedule photo', item)
    // }else{
      
    // }
  }

  let displayItems = saleItems.map((item, index) => {
    return (
      <Grid
        item
        key={`display-${item._id}-${index}`}
        xs={4}
        sm={4}
        md={4}
        sx={{ height: '100%', width: '100%' }}
      >
        <Card
          // onMouseEnter={() => {
          //   handleMouseOver(item)
          // }}
          sx={{
            width: '300px',
            display: 'flex',
            border: '0px',
            flexDirection: 'column',
            borderRadius: '0px',
            margin: '1px',
            boxShadow: 'none',

            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <Box sx={{ width: '99px', height: '99px', position: 'absolute' }}>
            <Box>
              <IconButton
                onClick={() => {
                  handleDeletePhoto(item)
                }}
                sx={{ position: 'relative', zIndex: '1000' }}
              >
                <DeleteIcon
                  fontSize="small"
                  variant="outlined"
                  sx={{ color: 'white', opacity: '0.8' }}
                />
              </IconButton>
            </Box>
            <Box>
              {item.postedTo[0] ? (
                <InstagramIcon
                  fontSize="small"
                  sx={{
                    position: 'relative',
                    top: '43px',
                    zIndex: '1000',
                    color: 'white',
                    opacity: '0.8',
                  }}
                />
              ) : (
                ''
              )}
            </Box>
          </Box>

          <Image
            src={`https://res.cloudinary.com/ddcynhc98/image/upload/${item.photos[0]
              .split('')
              .splice(50)
              .join('')}`}
            height="99px"
            width="99px"
            onClick={() => {
              handlePostSchedule(item)
            }}
            duration={0}
            fit="fill"
          />
        </Card>
      </Grid>
    )
  })

  return (
    <Card
      sx={{
        borderRadius: '25px',
        height: '650px',
        width: '300px',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },

        // minWidth: '200px'
      }}
    >
      <ConfirmDeleteModal
        openConfirmDeleteModal={openConfirmDeleteModal}
        handleClose={handleCloseConfirmDeleteModal}
        selectedPhoto={selectedPhoto}
      />
      <SchedulePostModal
        open={open}
        handleClose={handleClose}
        scheduleItem={scheduleItem}
        userData={userData}
      />
      <CardContent sx={{ padding: '0 0' }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" component="div" sx={{ margin: '5px 5px' }}>
              Media Library
            </Typography>
          </Grid>
          <Box>
            <Button
              component="label"
              disabled={!userData}
              onChange={(e) => {
                handlePhotoUpload(e)
              }}
            >
              <Box>
                <input type="file" hidden />

                <CardMedia
                  component="span"
                  sx={{
                    height: '100%',
                    width: '300%',
                    // border: '1px solid lightGray',
                  }}
                >
                  <AddPhotoAlternateIcon
                    sx={{ fontSize: '40px', color: 'black' }}
                  />
                </CardMedia>
              </Box>
            </Button>
          </Box>
        </Grid>
        <Grid container>{displayItems}</Grid>
      </CardContent>
    </Card>
  )
}

export default MediaLibrary
