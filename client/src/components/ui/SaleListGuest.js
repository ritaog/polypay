import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import InstagramIcon from '@mui/icons-material/Instagram'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BuyItemModal from '../modals/BuyItemModal'

import axios from 'axios'
import { useState, useEffect } from 'react'
// import { styled, Box } from '@mui/system'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70vw',
  height: '70vh',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: '25px'
}

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
`

export default function SaleListGuest({ userData, profileId }) {
  const [saleItems, setSaleItems] = useState([])
  const [buyModalItem, setBuyModalItem] = useState({})
  const [open, setOpen] = useState(false)

  const handleOpenModal = (item) => {
    setOpen(true)
    setBuyModalItem(item)
    console.log('item', item);
  }
  
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const getSaleItemsByProfileId = async () => {
      const response = await axios.get(
        '/saleItem/listUserSaleItemsById/' + profileId.id
      )
      response.data.sort(function (a, b) {
        return new Date(b.postTime) - new Date(a.postTime)
      })
      setSaleItems(response.data)
    }
    if (profileId) {
      getSaleItemsByProfileId()
    }
  }, [profileId])

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  let displayItems = saleItems.map((item) => {
    return (
      <Grid
        item
        xs={12}
        md={4}
        key={item._id + 'sale-list-guest'}
        sx={{ padding: '5px' }}
      >
        <Item
          sx={{
            height: '300px',
            width: '300px',
            overflow: 'hidden',
            padding: '0px',
            borderRadius: '0px',
            '&:hover': {
              cursor: 'pointer'
            },
          }}
        >
          {
            <>
              <ImageListItem>
                <img
                  src={`${item.photos[0]}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.photos[0]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.photos[0]}
                  onClick={() => handleOpenModal(item)}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={`Price: $ ${item.price}`}
                  subtitle={`Status: ${item.available}`}
                  position="bottom"
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InstagramIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            </>
          }
        </Item>
      </Grid>
    )
  })

  console.log('first', displayItems);

  return (
    <div>
      <BuyItemModal handleClose={handleClose} style={style} Backdrop={Backdrop} open={open} buyModalItem={buyModalItem} />

      <Card sx={{ maxWidth: '100vw' }}>
        <CardContent sx={{ justifyContent: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={3}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <ImageList
                sx={{ width: '100vh', height: '100%' }}
                cols={3}
                rowHeight={300}
              >
                {displayItems}
              </ImageList>
            </Grid>
          </Box>
                 
  
        </CardContent>
      </Card>
    </div>
  )
}
