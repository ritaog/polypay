import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Masonry from '@mui/lab/Masonry'
import SaleListUser from '../components/ui/SaleListUser'
import DisplayMedia from '../components/ui/DisplayMedia'

import { useState } from 'react'
import PostScheduler from '../components/imageUpload/PostScheduler'

const SchedulePostPage = ({ userData }) => {
  const [imageSelect, setImageSelect] = useState('')

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  const imageSelectHandler = (image) => {
    console.log('image', image)
    setImageSelect(image)
  }
  return (
    <div>
      <h1>Schedule A Post:</h1>
      <Box sx={{ width: '100%' }}>
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
      </Box>
    </div>
  )
}

export default SchedulePostPage
