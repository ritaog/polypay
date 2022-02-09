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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '0px',
  boxShadow: 0,
  height: '70vh',
  minHeight: '400px',
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
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: 'black' }}
                  >
                    {buyModalItem ? buyModalItem.about : ''}
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  {' '}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ paddingTop: '30px' }}
              >
                <Grid item>{`Price: $
                  ${
                    buyModalItem
                      ? parseFloat(buyModalItem.price.$numberDecimal)
                      : ''
                  }
                
                `}</Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ paddingTop: '10px' }}
              >
                <Grid item>{`Taxes: $
                  
                  ${
                    buyModalItem
                      ? (
                          parseFloat(buyModalItem.price.$numberDecimal) * 0.08
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
                sx={{ paddingTop: '10px' }}
              >
                <Grid item>hi</Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ paddingTop: '10px' }}
              >
                <Grid item>hi</Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default BuyItemModal
