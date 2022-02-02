import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { TextareaAutosize } from '@mui/material'

export default function AddressForm({imageSelect}) {
  console.log('imageSelect', imageSelect);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pick Image to Upload
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            value={imageSelect ? imageSelect._id : ''}
            label="Select Image"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid sx={{padding: '10px', width: '100%'}}>
          <img
            src={`${imageSelect.photos}?w=248&fit=crop&auto=format`}
            srcSet={`${imageSelect.photos}}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={imageSelect.vendorName}
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            id="address2"
            name="address2"
            label="Photo Caption"
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
