import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import axios from 'axios'
import { useState, useEffect } from 'react'

export default function SaleListUser({ userData, imageSelectHandler }) {
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
          ? saleItems.map((item) => (
              <ImageListItem key={item.photos[0]}>
                <img
                  src={`${item.photos[0]}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.photos[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.description}
                  loading="lazy"
                  onClick={() => {
                    imageSelectHandler(item)
                  }}
                />
                <ImageListItemBar
                  title={item.price}
                  subtitle={item.quantity}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          : ''}
      </ImageList>
    </div>
  )
}
