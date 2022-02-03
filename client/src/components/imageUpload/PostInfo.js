import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'


export default function PostInfo() {
  const [values, setValues] = useState('');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }


  return (
    <React.Fragment>
      <Grid container spacing={3} sx={{ padding: '0px' }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="price">Amount</InputLabel>
            <OutlinedInput
              id="price"
              placeholder="0.00"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              // value={values.amount}
              onChange={handleChange('amount')}
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
              // value={values.amount}
              onChange={handleChange('amount')}
              label="Quantity"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Availible to Ship"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
