import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'

import axios from 'axios'
import { useState, useEffect } from 'react'

export default function SaleListUser({userData}) {

  const [saleItems, setSaleItems] = useState([])

  useEffect(() => {  
    const getSaleItemsByLoggedUser = async () => {
      const response = await axios.get('/saleItem/listSaleItemsByLoggedUser')
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
          <ImageList sx={{ width: '100%' }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">
                {userData ? `${userData.userName}'s Recent Posts` : ''}
              </ListSubheader>
            </ImageListItem>
            {saleItems
              ? saleItems.map((item, index) => (
                  <ImageListItem key={item._id + index + 'user'}>
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
    </div>
  )
}

