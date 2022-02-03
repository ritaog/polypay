import * as React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

export default function ImageSelect({imageSelect}) {
  console.log('imageSelect', imageSelect);
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ padding: '10px' }}>
          <TextField
            required
            id="imageTitle"
            name="imageTitle"
            value={imageSelect ? imageSelect._id : ''}
            label="Select Image"
            fullwidth="true"
            variant="standard"
            sx={{ width: 200 }}
          />
        </Grid>
        <Grid item sx={{ padding: '10px', width: '100%' }}>
          <Img
            src={`${imageSelect.photos}?w=248&fit=crop&auto=format`}
            alt={imageSelect.vendorName}
            loading="lazy"
          />
        </Grid>
        <Grid item xs={12} sx={{ padding: '10px' }}>
          <TextField
            id="address2"
            name="address2"
            multiline
            maxRows={4}
            label="Photo Caption"
            fullwidth="true"
            variant="standard"
            sx={{ width: 200 }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
