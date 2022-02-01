import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import PhotoUploadForm from '../components/PhotoUploadForm'
import PhotoUpload from '../components/ui/PhotoUpload'
import SaleListUser from '../components/ui/SaleListUser'
import DisplayMedia from '../components/ui/DisplayMedia'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const SchedulePostPage = ({ userData }) => {
  console.log(userData)
  return (
    <div>
      <h1>Schedule A Post:</h1>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <SaleListUser userData={userData} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <PhotoUploadForm userData={userData} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <DisplayMedia userData={userData}/>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <PhotoUpload />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default SchedulePostPage
