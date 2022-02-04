import * as React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker'
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
            <StaticDateTimePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={postTime}
              onChange={(e) => {
                setPostTime(e)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item>
            <DateTimePicker
              label="Post Time"
              readOnly
              value={postTime}
              onChange={(e) => {
                console.log(e)
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={{ paddingTop: '10px' }}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
    </React.Fragment>
  )
}
