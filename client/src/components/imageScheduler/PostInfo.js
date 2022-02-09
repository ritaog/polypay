import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
// import { useState } from 'react'

export default function PostInfo({
  setAbout,
  setPrice,
  setQuantity,
  setLocation,
  setCanShip,
}) {
  return (
    <React.Fragment>
      <Grid container spacing={3} sx={{ height: '35em' }}>
        <Grid item xs={12} md={12}>
          {' '}
          <TextField
            id="outlined-textarea"
            label="About"
            onChange={(e) => {
              setAbout(e.target.value)
            }}
            rows={8}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="price">Price</InputLabel>
            <OutlinedInput
              id="price"
              placeholder="0.00"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="quantity">Quantity</InputLabel>
            <OutlinedInput
              id="quantity"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              onChange={(e) => {
                setQuantity(e.target.value)
              }}
              label="Quantity"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="location">Location</InputLabel>
            <OutlinedInput
              id="location"
              type="text"
              onChange={(e) => {
                setLocation(e.target.value)
              }}
              label="Location"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Availible to Ship"
              onChange={(e) => {
                setCanShip(e.target.checked)
              }}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
