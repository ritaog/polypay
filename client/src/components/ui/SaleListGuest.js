import * as React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import BuyItemModal from '../modals/BuyItemModal'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'

import Image from 'mui-image'
import axios from 'axios'
import { useState, useEffect } from 'react'
// import { styled, Box } from '@mui/system'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '325px',
  height: '600px',
  // minHeight: '650px',
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

export default function SaleListGuest({ profileId, setVendorName }) {
  const [saleItems, setSaleItems] = useState([])
  const [buyModalItem, setBuyModalItem] = useState()
  const [icon, setIcon] = useState()
  const [open, setOpen] = useState(false)

  const handleOpenModal = (item) => {
    setOpen(true)
    setBuyModalItem(item)
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    const getVendor = async () => {
      const response = await axios.get(`/user/getUser/${profileId}`)
      if (response.statusText === 'OK') {
        setIcon(response.data.photos[0])
      }
    }
    if (profileId){
      getVendor()
    } 
  }, [])

  useEffect(() => {
    const getSaleItemsByProfileId = async () => {
      const response = await axios.get(
        '/saleItem/listUserSaleItemsById/' + profileId
      )
      response.data.sort(function (a, b) {
        return new Date(b.postTime) - new Date(a.postTime)
      })
      setSaleItems(response.data)
      setVendorName(response.data[0].vendorName)
    }
    if (profileId) {
      getSaleItemsByProfileId()
    }
  }, [profileId, setVendorName])

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
            width: '100%',
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
            image={`https://res.cloudinary.com/ddcynhc98/image/upload/c_crop,h_3000,w_3000/${item.photos[0]
              .split('')
              .splice(50)
              .join('')}`}
            alt="random"
          />
          {/* <Image
            src={`https://res.cloudinary.com/ddcynhc98/image/upload/${item.photos[0]
              .split('')
              .splice(50)
              .join('')}`}
            height="150px"
            width="150px"
            onClick={() => handleOpenModal(item)}
            duration={0}
            fit="fill"
          /> */}
        </Card>
      </Grid>
    )
  })

  return (
    <div>
      <BuyItemModal
        handleClose={handleClose}
        style={style}
        Backdrop={Backdrop}
        open={open}
        buyModalItem={buyModalItem}
        icon={icon}
      />
      <Container sx={{ py: 4, minWidth: '80px', padding: '0px' }} maxWidth="md">
        <Grid container spacing={0}>
          {displayItems}
        </Grid>
      </Container>
    </div>
  )
}
