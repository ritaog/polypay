import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import axios from 'axios'
import { useState, useEffect } from 'react'

export default function SaleListUser({userData}) {

  const [saleItems, setSaleItems] = useState([])

  useEffect(() => {  
    const getSaleItemsByLoggedUser = async () => {
      const response = await axios.get('/saleItem/listUserSaleItemsByLoggedUser')
      console.log('responseUser', response.data);

      response.data.sort(function (a, b) {
        return new Date(b.postTime) - new Date(a.postTime)
      })

      setSaleItems(response.data)
    }
    if (userData) {
      getSaleItemsByLoggedUser()
    }
  }, [userData])

  let vendorName = saleItems[0]

  return (
    <div>
      <Card sx={{ maxWidth: 530 }}>
        <CardContent sx={{justifyContent: "center"}}>
          <ImageList sx={{ width: 500 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">
                {userData
                  ? userData.userName
                  : vendorName
                  ? vendorName.vendorName
                  : ''}
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
        </CardContent>
      </Card>
    </div>
  )
}

