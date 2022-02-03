import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ImageSelect from './ImageSelect'
import PostInfo from './PostInfo'
import Scheduler from './Scheduler'

export default function PostScheduler({ imageSelect }) {
  const [activeStep, setActiveStep] = React.useState(0)

  // const [title, setTitle] = useState('')
  // const [price, setPrice] = useState('')
  // const [quantity, setQuantity] = useState('')
  // const [caption, setCaption] = useState('')
  // const [about, setAbout] = useState('')
  // const [canShip, setCanShip] = useState(false)
  // const [location, setLocation] = useState('')
  // const [postTime, setPostTime] = useState('')

  // const scheduleHandler = async () => {
  // shortcut to combine the response from first post and user data from user state to be sent to back end as one object
  // const { instagramBusinessId, permanentToken, saleItems } = userData
  // const saleItemDataBundle = {
  //   ...responseUpload.data,
  //   instagramBusinessId,
  //   permanentToken,
  //   saleItems,
  // }
  // console.log('saleItemDataBundle', saleItemDataBundle)
  // second post sends combine object from above to back end to be posted to instagram and added to the users sale que
  // const responseSchedule = await axios.post(
  //   '/saleItem/schedule',
  //   saleItemDataBundle
  // )
  // console.log(responseSchedule)
  // }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const steps = [
    'Choose Image',
    'Quantity and Availability',
    'Schedule Post Time',
  ]

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ImageSelect imageSelect={imageSelect} />
      case 1:
        return <PostInfo />
      case 2:
        return <Scheduler />
      default:
        throw new Error('Unknown step')
    }
  }

  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Post Sale Items
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your post is scheduled!
                </Typography>
                <Typography variant="subtitle1">
                  Your post will be posted to instagram at: TIME AND DATE
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}
