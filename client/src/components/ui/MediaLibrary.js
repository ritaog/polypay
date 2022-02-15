import React from 'react'
import { Typography, Card, CardContent, Grid, CardMedia } from '@mui/material'

import axios from 'axios'
import { useState, useEffect } from 'react'

const MediaLibrary = ({ userData }) => {
  const [saleItems, setSaleItems] = useState([])

  useEffect(() => {
    const getSaleItemsByLoggedUser = async () => {
      const response = await axios.get('/saleItem/listImagesByLoggedUser')
      response.data.sort(function (a, b) {
        return new Date(b.postTime) - new Date(a.postTime)
      })

      setSaleItems(response.data)
    }
    if (userData) {
      getSaleItemsByLoggedUser()
    }
  }, [userData])

  const handlePhotoUpload = (e) => {
    console.log('uploadPhoto')
  }

  const handlePostSchedule = (e) => {
    console.log('schedule photo', e.target.src)
  }

  saleItems.push({
    _id: 12345,
    blankPhoto: 'images/480px-OOjs_UI_icon_add.png',
  })

  console.log('saleItems', saleItems)

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
            <CardMedia
              onClick={(e) => {handlePhotoUpload(e)}}
              component="img"
              sx={{
                height: '100%',
                width: '100%',
                border: '1px solid lightGray',
              }}
              image={item.blankPhoto}
              alt="random"
            />
          ) : (
            <CardMedia
              onClick={(e) => {
                handlePostSchedule(e)
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
      }}
    >
      <CardContent sx={{ padding: '16px 0' }}>
        <Typography>MediaLibrary</Typography>
        <Grid container>{displayItems}</Grid>
      </CardContent>
    </Card>
  )
}

export default MediaLibrary
