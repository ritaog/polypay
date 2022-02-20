import React from 'react'
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Button,
} from '@mui/material'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SchedulePostModal from '../modals/SchedulePostModal'

const MediaLibrary = ({ userData }) => {
  const navigate = useNavigate()
  const [saleItems, setSaleItems] = useState([])
  const [scheduleItem, setScheduleItem] = useState()
  const [open, setOpen] = React.useState(false)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const getMediaByLoggedUser = async () => {
      const response = await axios.get('/media/listImagesByLoggedUser')
      response.data.sort(function (a, b) {
        return new Date(b.postTime) - new Date(a.postTime)
      })
      response.data.unshift({
        _id: 'upload-image',
        blankPhoto: 'images/480px-OOjs_UI_icon_add.png',
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
    const postData = {
      vendorName: userData?.userName,
      vendorId: userData?._id,
      photos: [],
      uploadTime: new Date(),
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

  const handlePostSchedule = (item) => {
    setScheduleItem(item)
    setOpen(true)
    console.log('schedule photo', item)
  }

  let displayItems = saleItems.map((item, index) => {
    return (
      <Grid
        item
        key={`display-${item._id}-${index}`}
        xs={4}
        sm={4}
        md={4}
        sx={{ minHeight: '100px', minWidth: '100px' }}
      >
        <Card
          sx={{
            minWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0px',
            padding: '1px',

            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          {item.blankPhoto ? (
            <Button
              component="label"
              onChange={(e) => {
                handlePhotoUpload(e)
              }}
            >
              {/* <Box> */}
                <input type="file" hidden />
                <CardMedia
                  component="img"
                  sx={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid lightGray',
                  }}
                  image={item.blankPhoto}
                  alt="random"
                />
              {/* </Box> */}
            </Button>
          ) : (
            <CardMedia
              onClick={() => {
                handlePostSchedule(item)
              }}
              component="img"
              sx={{
                height: '100%',
                width: '100%',
              }}
              image={`https://res.cloudinary.com/ddcynhc98/image/upload/c_crop,h_1500,w_1500/${item.photos[0]
                .split('')
                .splice(50)
                .join('')}`}
              alt="random"
            />
          )}
        </Card>
      </Grid>
    )
  })

  return (
    <Card
      sx={{
        borderRadius: '25px',
        height: '875px',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        // minWidth: '200px'
      }}
    >
      <SchedulePostModal open={open} handleClose={handleClose} scheduleItem={scheduleItem} userData={userData}/>
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
        </Grid>
        <Grid container>{displayItems}</Grid>
      </CardContent>
    </Card>
  )
}

export default MediaLibrary
