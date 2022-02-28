import * as React from 'react'
// import { styled } from '@mui/material/styles'
// import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Masonry from '@mui/lab/Masonry'
// import TimeLine from '../components/ui/TimeLine'
import InstaRecentPosts from '../components/ui/InstaRecentPosts'
// import AddImage from '../components/ui/AddImage'

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }))

const PostDashboardPage = ({ userData }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* <div>Media Library</div> */}
      <Masonry columns={2} spacing={2}>
        {/* <Item sx={{ maxWidth: '50%', minWidth: '450px'}}> */}
        {/* <DisplayMedia userData={userData} /> */}
        {/* </Item> */}
        {/* <Item
          sx={{
            maxWidth: '50%',
            minWidth: '450px',
            maxHeight: '750px',
            overflowY: 'auto',
          }}
        > */}
        {/* <TimeLine userData={userData} /> */}
        {/* </Item> */}
        <InstaRecentPosts userData={userData} />
      </Masonry>
    </Box>
  )
}

export default PostDashboardPage
