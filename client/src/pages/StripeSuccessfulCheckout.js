import { Link } from "react-router-dom"
import React from 'react'
import { Box, Typography } from "@mui/material"

const styleHeader = {
  padding: '200px',
}

export default function StripeSuccessfulCheckout() { 

  return (
    <div>
      <Box sx={styleHeader}>
        <Typography  variant="h7" component="h2">
        <h1>Thanks for your order!</h1>
        <br/>
        
        We appreciate your patronage! <br/><br/>
        A receipt has been sent to the email
        address you provided at checkout.
        </Typography>
        <br/><br/><br/><br/> <br/> <br/>      
        <Typography  variant="h7" component="h2">
        Want to learn more about PolyPay? <br/><br/>
        Click the button below to visit our home page!
        <br/>
        <br/>
        <Link to = "/">
        <button>PolyPay Home Page</button>
        </Link>
        </Typography>
      </Box>
    </div>
  )
}



