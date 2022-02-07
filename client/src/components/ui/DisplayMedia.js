import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ListSubheader from '@mui/material/ListSubheader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import axios from 'axios'
import { useState, useEffect } from 'react'

export default function SaleListUser({ userData, imageSelectHandler }) {
  const [saleItems, setSaleItems] = useState([])

  const postData = {
    vendorName: userData.userName,
    vendorId: userData._id,
    postTitle: '',
    price: 0,
    quantity: 0,
    photos: [],
    description: '',
    about: '',
    canShip: false,
    available: 'Scheduled',
    postTime: new Date(),
    location: '',
  }

  const uploadHandler = async (e) => {
    // assigns a new form data constructor to append data to to send to back end. 'image' is file selected by user to be uploaded to instagram
    // "formData" is all the data collected from the schedule post form to be sent to back end

    console.log('uploadPhoto', e.target.files[0])
    console.log('postData', postData)

    const imageData = new FormData()
    imageData.append('image', e.target.files[0])
    imageData.append('formData', JSON.stringify(postData))

    // first post sends photo file and form data to back end. response is the compiled sale item object with image url from cloudinary
    const responseUpload = await axios.post('/saleItem/upload', imageData)
    window.location.reload(false)
    console.log(responseUpload)
  }

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

  return (
    <div>
      <ImageList sx={{ width: '100%', margin: '0px' }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12} md={6}>
                <Typography>
                  {userData ? `${userData.userName}'s Media Library` : ''}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  component="label"
                  onChange={(e) => {
                    uploadHandler(e)
                  }}
                  sx={{
                    backgroundColor: 'black',
                    '&:hover': { backgroundColor: 'darkGray' },
                  }}
                >
                  Upload Image
                  <input type="file" hidden />
                </Button>
              </Grid>
            </Grid>
          </ListSubheader>
        </ImageListItem>
        {saleItems
          ? saleItems.map((item,index) => (
              <ImageListItem key={item._id + index + 'media'} sx={{'&:hover': {cursor: 'pointer'}}}>
                <img
                  src={`${item.photos[0]}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.photos[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.description}
                  loading="lazy"
                  onClick={() => {
                    imageSelectHandler(item)
                  }}
                />
              </ImageListItem>
            ))
          : ''}
      </ImageList>
    </div>
  )
}
