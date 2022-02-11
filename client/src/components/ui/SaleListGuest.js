import * as React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import BuyItemModal from '../modals/BuyItemModal'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'

import axios from 'axios'
import { useState, useEffect } from 'react'
// import { styled, Box } from '@mui/system'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '900px',
  minWidth: '800px',
  height: '600px',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  padding: '0px',
  outline: 'none',
  borderRadius: '25px',
}

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  -webkit-tap-highlight-color: transparent;
`

export default function SaleListGuest({ userData, profileId }) {
  const [saleItems, setSaleItems] = useState([])
  const [buyModalItem, setBuyModalItem] = useState()
  const [open, setOpen] = useState(false)

  const handleOpenModal = (item) => {
    setOpen(true)
    setBuyModalItem(item)
    console.log('item', item)
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
            onClick={() => handleOpenModal(item)}
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
        </Card>
      </Grid>

      // <Grid item key={item._id + 'sale-list-guest'}  sx={{ padding: '1px' }}>
      //   <Item
      //     sx={{
      //       maxHeight: '100px',
      //       maxWidth: '100px',
      //       overflow: 'hidden',
      //       padding: '0px',
      //       borderRadius: '0px',
      //       '&:hover': {
      //         cursor: 'pointer',
      //       },
      //     }}
      //   >
      //     {
      //       <>
      //         <ImageListItem>
      //           <img
      //             src={`${item.photos[0]}?w=164&h=164&fit=crop&auto=format`}
      //             srcSet={`${item.photos[0]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      //             alt={item.photos[0]}
      //             onClick={() => handleOpenModal(item)}
      //             loading="lazy"
      //           />
      //           <ImageListItemBar
      //             title={`Price: $ ${parseFloat(item.price.$numberDecimal)}`}
      //             subtitle={`Status: ${item.available}`}
      //             position="top"
      //             sx={{height: '30px'}}
      // actionIcon={
      // <IconButton
      //   sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
      //   aria-label={`info about ${item.title}`}
      // >
      //   <InstagramIcon />
      // </IconButton>
      // }
      //     />
      //   </ImageListItem>
      // </>
      //       }
      //     </Item>
      //   </Grid>
    )
  })

  console.log('first', buyModalItem)

  return (
    <div>
      <BuyItemModal
        handleClose={handleClose}
        style={style}
        Backdrop={Backdrop}
        open={open}
        buyModalItem={buyModalItem}
      />
      {/* <Card sx={{ maxWidth: '100%' }}>
        <CardContent> */}
      {/* <Grid
              container
              direction="row"
              alignItems="flex-start"
              justifyContent="center"
            > */}
      <Container sx={{ py: 4, minWidth: '80px' }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={0}>
          {displayItems}
        </Grid>
      </Container>
      {/* </Grid> */}
      {/* </CardContent>
      </Card> */}
    </div>
  )
}
