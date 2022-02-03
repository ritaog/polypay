import * as React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { useState } from 'react'

export default function Scheduler() {
  const [value, setValue] = useState(new Date())
  return (
    <React.Fragment>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item>
            <StaticDateTimePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={value}
              onChange={(newValue) => {
                console.log('newValue', newValue)
                setValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item>
            <DateTimePicker
              label="Post Time"
              readOnly
              value={value}
              renderInput={(params) => <TextField {...params} />}
              sx={{ paddingTop: '10px' }}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
    </React.Fragment>
  )
}
