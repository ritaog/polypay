import React from 'react'
import {
  Card,
  Box,
  Grid,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Container,
  Link,
} from '@mui/material'
import Image from 'mui-image'
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '25px',
  boxShadow: 24,
  p: 4,
}

const SignInPage = ({setUserState}) => {
  const theme = createTheme()
  const navigate = useNavigate()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const user = {
      emailAddress: emailAddress,
      password: password,
    }
    // data is sent to login endpoint
    const response = await axios.post('/auth/login', user)

    console.log('This is the response from the server', response.data)

    // response from authentication endpoint (userdata if corrrect email/password) is assigned to the users state function on 'app.js'
    setUserState(response.data)

    // navigates to home page
    navigate('/post-dashboard')
  }
  return (
    <Card>
      <Box sx={style}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ paddingBottom: '10px' }}>
                <Image
                  src="/images/polypay_armadillo.png"
                  alt="logo"
                  height="150px"
                  width="150px"
                  fit="fill"
                />
              </Box>
              <Typography component="h1" variant="h5">
                PolyPay Sign In
              </Typography>{' '}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  onChange={(e) => {
                    setEmailAddress(e.target.value)
                  }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/profile" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Card>
  )
}

export default SignInPage
