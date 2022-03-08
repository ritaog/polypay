import React from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Container, Card } from '@mui/material'
import { useState } from 'react'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '100%',
  height: '100%',
})

const BuyItemModal = ({ handleClose, Backdrop, style, buyModalItem, open }) => {
  // console.log('buyModalItem', buyModalItem)

  const minValue = 1
  const maxValue = buyModalItem?.quantity
  const [purchaseQuantity, setPurchaseQuantity] = useState(1)

  const handleQuant = (e) => {
    const newValue = Math.min(Math.max(e.target.value, minValue), maxValue)
    setPurchaseQuantity(newValue)
  }

  const handlePurchase = async () => {
    const purchaseInfo = [{ id: buyModalItem._id, purchaseQuantity }]
    /*
    const saleData = {
      saleItemTitle: buyModalItem.postTitle,
      saleItemId: buyModalItem._id,
      vendorId: buyModalItem.vendorId,
      saleTotal: buyModalItem.price,
      saleDate: new Date(),
      fulfilled: false,
      quantity: purchaseQuantity,

    } */
    // console.log(purchaseInfo)
    // const resData = await axios.post('/saleData/saveSaleData', saleData)
    // console.log('resData', resData)

    const response = await axios.post(
      '/payment/create-checkout-session',
      purchaseInfo
    )

    console.log(response)

    const { url } = response.data

    if (!url) throw new Error('Cannot find payment page!')

    //open url in a new tab
    window.open(url)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          fullwidth="true"
          sx={{ borderBottom: '1px solid lightGray' }}
        >
          <Grid item xs={1} sm={1} md={1} sx={{ margin: '10px' }}>
            <Avatar alt="User Name" src="/static/images/avatar/2.jpg" />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Typography align="left">
              {buyModalItem ? buyModalItem.vendorName : ''}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <IconButton
              aria-label="delete"
              onClick={handleClose}
              sx={{ margin: '10px' }}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box
          height="530px"
          sx={{
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Grid container>
            <Grid item sx={{ paddingLeft: '10px', paddingBottom: '10px' }}>
              <Typography variant="subtitle1" sx={{ color: 'black' }}>{`${
                buyModalItem ? buyModalItem.postTitle : ''
              } (${buyModalItem ? buyModalItem.quantity : ''})`}</Typography>
            </Grid>
          </Grid>
          <Container
            sx={{ py: 4, minWidth: '80px', padding: '0px', overflow: 'hidden' }}
            maxWidth="md"
          >
            <Grid container>
              <Grid item>
                <Card
                  sx={{
                    minWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '0px',
                    boxShadow: '0px',
                    border: '0px',
                  }}
                >
                  <Img
                    alt="thing"
                    src={
                      buyModalItem
                        ? `https://res.cloudinary.com/ddcynhc98/image/upload/c_crop,h_3000,w_3000/${buyModalItem.photos[0]
                            .split('')
                            .splice(50)
                            .join('')}`
                        : 'Loading...'
                    }
                  />
                </Card>
              </Grid>
            </Grid>
          </Container>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ paddingTop: '10px', paddingLeft: '10px' }}
          >
            <Grid item xs={4}>
              <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="price">Quantity</InputLabel>
                <OutlinedInput
                  id="price"
                  placeholder="0"
                  type="number"
                  min="0"
                  onChange={(e) => {
                    handleQuant(e)
                  }}
                  value={purchaseQuantity}
                  label="Amount"
                />
              </FormControl>
            </Grid>
            <Grid item sx={{ justifyContent: 'left', marginRight: '20px' }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ paddingRight: '20px' }}
              >
                {' '}
                {`Price: $${
                  buyModalItem
                    ? (
                        parseFloat(buyModalItem.price.$numberDecimal) *
                        purchaseQuantity
                      ).toFixed(2)
                    : ''
                }`}
              </Typography>
              {/* <Typography
                variant="body2"
                gutterBottom
                sx={{ paddingRight: '20px' }}
              >{`Taxes: $${
                buyModalItem
                  ? (
                      parseFloat(buyModalItem.price.$numberDecimal) *
                      purchaseQuantity *
                      0.08
                    ).toFixed(2)
                  : ''
              }
                
                `}</Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ paddingRight: '20px' }}
              >{`Fees: $${
                buyModalItem
                  ? (
                      parseFloat(buyModalItem.price.$numberDecimal) *
                      purchaseQuantity *
                      0.02
                    ).toFixed(2)
                  : ''
              }
                
                `}</Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ paddingRight: '20px' }}
              >{`Total: $${
                buyModalItem
                  ? (
                      parseFloat(buyModalItem.price.$numberDecimal) *
                        purchaseQuantity +
                      parseFloat(buyModalItem.price.$numberDecimal) *
                        purchaseQuantity *
                        0.08 +
                      parseFloat(buyModalItem.price.$numberDecimal) *
                        purchaseQuantity *
                        0.02
                    ).toFixed(2)
                  : ''
              }
                
                `}</Typography> */}
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              direction: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              // height: '80px',
            }}
          >
            <Box sx={{ padding: ' 0 10px  0 10px' }}>
              {buyModalItem ? (
                <Typography component="div">{buyModalItem.about}</Typography>
              ) : (
                ''
              )}
            </Box>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ padding: ' 10px 20px  10px 20px' }}
          >
            {/* <Button variant="contained">Add To Cart</Button> */}
            <Button variant="contained" onClick={handlePurchase} fullWidth>
              Buy Now
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  )
}

export default BuyItemModal
