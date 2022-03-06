import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
// import InstagramIcon from '@mui/icons-material/Instagram'
import {
  Grid,
  Box,
  TextField,
  FormControlLabel,
  Button,
  Typography,
  Switch,
  ButtonGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material'
// import { useState } from 'react'

const EditPostForm = ({
  setPostTitle,
  postTitle,
  setPrice,
  price,
  setCaption,
  caption,
  setAbout,
  about,
  setCanShip,
  canShip,
  setLocation,
  location,
  setPostTime,
  postTime,
  quantity,
  handleIncrement,
  handleDecrement,
  edit,
}) => {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Box
        sx={{
          width: '100%',
          padding: ' 10px 10px 10px 10px',
        }}
      >
        <TextField
          fullWidth
          label="Product Title"
          id="fullWidth"
          value={postTitle}
          disabled={edit}
          onChange={(e) => {
            setPostTitle(e.target.value)
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: ' 0 10px 10px 10px',
        }}
      >
        <TextField
          fullWidth
          label=" Instagram Description & Hashtags (optional)"
          id="fullWidth"
          multiline
          rows={6}
          disabled={edit}
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value)
          }}
        />
      </Box>
      {/* <Box
        sx={{
          padding: ' 0 10px 10px 10px',
        }}
      >
        <FormControlLabel
          value="end"
          control={<Switch color="primary" />}
          label="Save Hashtags (pre-populates future posts)"
          labelPlacement="end"
        />
      </Box> */}
      <Box
        sx={{
          width: '100%',
          padding: ' 0 10px 10px 10px',
        }}
      >
        <TextField
          fullWidth
          label="About Your Product"
          id="fullWidth"
          value={about}
          disabled={edit}
          multiline
          rows={4}
          onChange={(e) => {
            setAbout(e.target.value)
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: ' 10px 10px 10px 10px',
        }}
      >
        <TextField
          fullWidth
          label="Location"
          id="fullWidth"
          value={location}
          disabled={edit}
          onChange={(e) => {
            setLocation(e.target.value)
          }}
        />
      </Box>
      <Box
        sx={{
          padding: ' 0 10px 10px 10px',
        }}
      >
        <FormControlLabel
          control={<Switch color="primary" />}
          label="Item Available to Ship"
          labelPlacement="end"
          value={canShip}
          disabled={edit}
          onChange={(e) => {
            setCanShip(e.target.checked)
          }}
        />
      </Box>
      <Box>
        <ButtonGroup
          size="large"
          aria-label="small outlined button group"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: '20px',
          }}
        >
          <Typography
            variant="h7"
            component="span"
            sx={{ paddingRight: '20px' }}
          >
            Quantity Available
          </Typography>
          <Button onClick={handleDecrement} disabled={edit}>
            -
          </Button>
          <Button>{quantity}</Button>
          <Button onClick={handleIncrement} disabled={edit}>
            +
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: ' 20px 20px 10px 10px',
        }}
      >
        <FormControl>
          <InputLabel htmlFor="price">Price</InputLabel>
          <OutlinedInput
            id="price"
            placeholder="0.00"
            type="number"
            disabled={edit}
            value={price}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => {
              setPrice(e.target.value)
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginRight: '20px',
          padding: ' 10px 0 10px 20px',
        }}
      >
        <Typography variant="h7" sx={{ paddingRight: '20px' }}>
          Schedule Time
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            value={postTime}
            disabled={true}
            onChange={(newValue) => {
              setPostTime(newValue)
            }}
          />
        </LocalizationProvider>
      </Box>
      {/* <Box
        sx={{
          padding: ' 0 10px 10px 10px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <InstagramIcon
          sx={{ marginRight: '20px', color: 'gray', fontSize: '35px' }}
        />

        <FormControlLabel
          value="end"
          disabled={edit}
          control={<Switch color="primary" />}
          label="Publish to Instagram"
          labelPlacement="end"
        />
      </Box> */}
    </Grid>
  )
}

export default EditPostForm
