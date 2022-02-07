import * as React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import DateTimePicker from '@mui/lab/DateTimePicker'

export default function Scheduler({ setPostTime, postTime }) {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'center', height: '35em' }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item>
            <DateTimePicker
              label="Post Time"
              value={postTime}
              onChange={(e) => {
                setPostTime(new Date(e))
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ paddingTop: '10px' }}
            />
          </Grid>
          <Grid item>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Post Now"
                onChange={(e) => {
                  if (e.target.checked) setPostTime(new Date())
                }}
              />
            </FormGroup>
          </Grid>
        </LocalizationProvider>
      </Grid>
    </React.Fragment>
  )
}
