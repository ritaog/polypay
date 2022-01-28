import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import axios from 'axios'
import FacebookLogin from 'react-facebook-login'
import { useState, useEffect } from 'react'
import './LinkFaceBookCard.css'

export default function LinkFacebookCard({ userData }) {
  const [dataBundle, setDataBundle] = useState()

  const responseFacebook = (response) => {
    // bundles together data from response from facebook above and userData from the users state passed down from 'app.js'
    let userDataBundle = {
      userData,
      response,
    }
    setDataBundle(userDataBundle)
  }

  // once data bundle has been saved. data is sent to the "/validateFb" endpoint in back end to generate instagram business id and permanent access token
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post('auth/validateFb', dataBundle)
      console.log(response)
    }
    if (dataBundle) {
      getData()
    }
  }, [dataBundle])

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          Link Facebook Account
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Schedule Posts Directly to Instagram
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          1. Ensure that you have a business instagram account
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          2. Have a facebook account that you have access to
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          3. Have a facebook page linked to your instagram account
        </Typography>

        <FacebookLogin
          appId="2632625433548280"
          autoLoad={false}
          fields="name,email,picture"
          cssClass="FbBtn"
          scope="
            public_profile, 
            instagram_basic, 
            pages_show_list,
            pages_read_engagement, 
            ads_management, 
            business_management, 
            instagram_content_publish, 
            pages_read_engagement,
            instagram_manage_comments
            "
          // onClick={componentClicked}
          callback={responseFacebook}
        />
      </CardContent>
    </React.Fragment>
  )

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}
