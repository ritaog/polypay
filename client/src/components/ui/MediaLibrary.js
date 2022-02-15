import React from 'react'
import { Typography, Card, CardContent, Grid, CardMedia } from '@mui/material'

import axios from 'axios'
import { useState, useEffect } from 'react'

const MediaLibrary = ({userData}) => {

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

    if (saleItems.length <= 21) {
      let loopNum = saleItems.length
      for (let i = 0; i<(21-loopNum); i++){
        saleItems.push({_id: i, blankPhoto: "images/no-image-icon-23487.png" })
      }
    }

    console.log('saleItems', saleItems)
    

      let displayItems = saleItems.map((item) => {
        return (
          <Grid
            item
            key={`display-${item._id}`}
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
              <CardMedia
                onClick={() => {
                  console.log('click')
                }}
                component="img"
                sx={{
                  height: '100%',
                  width: '100%',
                }}

                // image={`https://res.cloudinary.com/ddcynhc98/image/upload/c_crop,h_1500,w_1500/${item.photos[0]
                //   .split('')
                //   .splice(50)
                //   .join('')}`}
                image={'images/no-image-icon-23487.png'}
                alt="random"
              />
            </Card>
          </Grid>
        )
      })

  return (
    <Card sx={{ borderRadius: '25px', height: '875px', overflowY: 'scroll', 'scrollbarWidth': 'none'}}>
      <CardContent sx={{ padding: '16px 0' }}>
        <Typography>MediaLibrary</Typography>
        <Grid container>{displayItems}</Grid>
      </CardContent>
    </Card>
  )
}

export default MediaLibrary