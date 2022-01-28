// import { useState, useEffect } from 'react'
// import FacebookLogin from 'react-facebook-login'
import LinkFacebookCard from '../components/ui/LinkFaceBookCard'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
// import axios from 'axios'
// import { Link } from 'react-router-dom'

const LinkAccountPage = ({ userData }) => {
  // const [dataBundle, setDataBundle] = useState()

  // once data bundle has been saved. data is sent to the "/validateFb" endpoint in back end to generate instagram business id and permanent access token
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await axios.post('auth/validateFb', dataBundle)
  //     console.log(response)
  //   }
  //   if (dataBundle) {
  //     getData()
  //   }
  // }, [dataBundle])

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
    <div>
      <Box spacing={1} sx={{ width: '100%' }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          rowSpacing={1}
          sx={{ padding: '0 300px 0 300px' }}
        >
          <Grid item xs={8}>
            <Item sx={{ margin: '10px' }}>
              <LinkFacebookCard userData={userData} />
            </Item>
            <Item sx={{ margin: '10px' }}>
              <LinkFacebookCard userData={userData} />
            </Item>
            <Item sx={{ margin: '10px' }}>
              <LinkFacebookCard userData={userData} />
            </Item>
            <Item sx={{ margin: '10px' }}>
              <LinkFacebookCard userData={userData} />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div>
      </div>
    </div>
  )
}

export default LinkAccountPage
