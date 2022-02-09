import React from 'react'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '0px',
  boxShadow: 0,
  height: '600px',
  padding: '0px',
}))

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '540px',
  height: '675px',
})

const BuyItemModal = ({ handleClose, Backdrop, style, buyModalItem, open }) => {
  console.log('buyModalItem', buyModalItem)

  const minValue = 1
  const maxValue = buyModalItem?.quantity
  const [purchaseQuantity, setPurchaseQuantity] = useState(1)

  const handleQuant = (e) => {
    const newValue = Math.min(Math.max(e.target.value, minValue), maxValue)
    setPurchaseQuantity(newValue)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
    >
      <Box sx={style} overflow="hidden">
        <Grid container spacing={0}>
          <Grid item md={7}>
            <Item>
              <Img
                alt="thing"
                src={buyModalItem ? buyModalItem.photos : 'Loading...'}
              />
            </Item>
          </Grid>
          <Grid item md={5}>
            <Item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item md={2} sx={{ padding: '10px 0px 10px 10px' }}>
                  <Avatar alt="User Name" src="/static/images/avatar/2.jpg" />
                </Grid>
                <Grid item md={8}>
                  <Typography align="left">
                    {buyModalItem ? buyModalItem.vendorName : ''}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <IconButton aria-label="delete" onClick={handleClose}>
                    <CloseOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sx={{ paddingLeft: '10px', paddingBottom: '20px' }}>
                  <Typography variant="h5" sx={{ color: 'black' }}>{`${
                    buyModalItem ? buyModalItem.postTitle : ''
                  } (${
                    buyModalItem ? buyModalItem.quantity : ''
                  })`}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Typography variant="h7" sx={{ paddingLeft: '10px' }}>
                    About:
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={1}>
                  {' '}
                </Grid>
                <Grid item md={10} sx={{ paddingTop: '10px' }}>
                  <Box sx={{ height: '150px' }}>
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{ color: 'black' }}
                    >
                      {buyModalItem ? buyModalItem.about : ''}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={1}>
                  {' '}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="between"
                alignItems="flex-end"
                sx={{ paddingTop: '30px', paddingRight: '30px' }}
              >
                <Grid item md={3}>
                  <FormControl fullWidth sx={{ m: 1 }}>
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
                <Grid
                  item
                  md={9}
                  sx={{ display: 'flex', justifyContent: 'right' }}
                >{`Price: $${
                  buyModalItem
                    ? parseFloat(buyModalItem.price.$numberDecimal) *
                      purchaseQuantity
                    : ''
                }`}</Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ paddingTop: '10px', paddingRight: '30px' }}
              >
                <Grid item>{`Taxes: $${
                  buyModalItem
                    ? (
                        parseFloat(buyModalItem.price.$numberDecimal) *
                        purchaseQuantity *
                        0.08
                      ).toFixed(2)
                    : ''
                }
                
                `}</Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ paddingTop: '10px', paddingRight: '30px' }}
              >
                <Grid item>{`Fees: $${
                  buyModalItem
                    ? (
                        parseFloat(buyModalItem.price.$numberDecimal) *
                        purchaseQuantity *
                        0.02
                      ).toFixed(2)
                    : ''
                }
                
                `}</Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ paddingTop: '10px', paddingRight: '30px' }}
              >
                <Grid item>{`Total: $${
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
                
                `}</Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  direction: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: '80px',
                }}
              >
                <Stack spacing={2} direction="row">
                  <Button variant="contained">Add To Cart</Button>
                  <Button variant="contained">Buy Now</Button>
                </Stack>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default BuyItemModal
