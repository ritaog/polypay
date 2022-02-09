import * as React from 'react'
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

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  let displayItems = saleItems.map((item) => {
    return (
      <Grid item key={item._id + 'sale-list-guest'} sx={{ padding: '5px' }}>
        <Item
          sx={{
            height: '300px',
            width: '300px',
            overflow: 'hidden',
            padding: '0px',
            borderRadius: '0px',
            '&:hover': {
              cursor: 'pointer',
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
                  title={`Price: $ ${parseFloat(item.price.$numberDecimal)}`}
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
      <Card sx={{ maxWidth: '100%' }}>
        <CardContent>
          <Box>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justifyContent="center"
            >
              {displayItems}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
