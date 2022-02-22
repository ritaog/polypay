import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import axios from 'axios'

import './LinkFaceBookCard.css'

export default function LinkStripeCard({ userData }) {
  const handleStripeOnboarding = async () => {
    if (!userData) throw new Error('User cannot be found!')

    const { emailAddress } = userData
    const detailsForOnboarding = { emailAddress }

    const response = await axios.post(
      'payment/onboardVendorToStripe',
      detailsForOnboarding
    )

    if (!response) throw new Error('Authentication failed!')

    const url = response.data

    window.location = url
  }

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          Set Up Stripe Account
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Get your Payments directly in your bank account
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          - A Stripe account was automatically created for you when you signed
          up
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          -You need to provide your personal information and bank details in
          order to receive payments
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          -This process should not take more than five minutes
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleStripeOnboarding}
        >
          Set Up Account
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
