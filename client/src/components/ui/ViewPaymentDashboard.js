import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import axios from 'axios'

import './LinkFaceBookCard.css'

export default function ViewPaymentDashboard({ userData }) {
  const handlePaymentDashboardView = async () => {
    if (!userData) throw new Error('User cannot be found!')

    const response = await axios.post('payment/createLoginLink', userData)

    if (!response) throw new Error('Cannot find redirect link!')

    const { url } = response.data
    window.open(url)
  }

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          You Can View Your Earnings Here
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handlePaymentDashboardView}
        >
          View Your Earnings
        </Button>
      </CardContent>
    </React.Fragment>
  )

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}
