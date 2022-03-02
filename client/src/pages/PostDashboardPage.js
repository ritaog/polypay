import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Masonry from '@mui/lab/Masonry'
import TimeLine from '../components/ui/TimeLine'
import InstaRecentPosts from '../components/ui/InstaRecentPosts'
// import AddImage from '../components/ui/AddImage'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '25px',
  height: '70px'
}))

const PostDashboardPage = ({ userData }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '25%', padding: '0 20px 20px 0' }}>
          <Item>hello</Item>
        </Box>
        <Box sx={{ width: '25%', padding: '0 20px 20px 0' }}>
          <Item>hello</Item>
        </Box>
        <Box sx={{ width: '25%', padding: '0 20px 20px 0' }}>
          <Item>hello</Item>
        </Box>
        <Box sx={{ width: '25%', padding: '0 20px 20px 0' }}>
          <Item>hello</Item>
        </Box>
      </Box>

      <InstaRecentPosts userData={userData} />
      {/* <Item
        sx={{
          maxWidth: '50%',
          minWidth: '450px',
          maxHeight: '750px',
          overflowY: 'auto',
        }}
      >
        <TimeLine userData={userData} />
      </Item> */}
      {/* </Masonry> */}
    </Box>
  )
}

export default PostDashboardPage
