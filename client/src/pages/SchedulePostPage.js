// import { styled } from '@mui/material/styles'
// import Paper from '@mui/material/Paper'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
// import Masonry from '@mui/lab/Masonry'
// import SaleListUser from '../components/ui/SaleListUser'
// import DisplayMedia from '../components/ui/DisplayMedia'

// import { useState } from 'react'
// import PostScheduler from '../components/imageScheduler/PostScheduler'
import MediaLibrary from '../components/ui/MediaLibrary'
import MediaCalender from '../components/ui/MediaCalender'

const SchedulePostPage = ({ userData }) => {
  // const [imageSelect, setImageSelect] = useState('')

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }))

  // const imageSelectHandler = (image) => {
  //   console.log('image', image)
  //   setImageSelect(image)
  // }
  return (
    <Box sx={{display: 'flex'}}>
      {/* <Grid
        container
        spacing={0}
        sx={{ padding: '0', height: '100%' }}
      >
        <Grid item xs={4} sm={4} md={3} > */}
        <Box sx={{marginRight: '10px', width: "300px"}}>
          <MediaLibrary userData={userData} />
        </Box>
        {/* </Grid>
        <Grid item xs={12} sm={12} md={9} sx={{minWidth: '900px'}}> */}
        <Box sx={{marginLeft: '10px', width: '100%'}}>
          <MediaCalender userData={userData} />
        </Box>
        {/* </Grid> */}
      {/* </Grid> */}
    </Box>
    /* <Box sx={{ width: '100%' }}>
        <Masonry columns={2} spacing={2}>
          <Item sx={{ maxWidth: '50%', minWidth: '350px' }}>
            <DisplayMedia
              userData={userData}
              imageSelectHandler={imageSelectHandler}
            />
          </Item>
          <Item sx={{ maxWidth: '50%', minWidth: '350px' }}>
            <PostScheduler imageSelect={imageSelect} userData={userData} />
          </Item>
          <Item sx={{ maxWidth: '50%', minWidth: '350px'}}>
            <SaleListUser userData={userData} />
          </Item>
        </Masonry>
      </Box> */
  )
}

export default SchedulePostPage
