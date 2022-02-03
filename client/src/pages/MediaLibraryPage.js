import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import DisplayMedia from '../components/ui/DisplayMedia'
import Masonry from '@mui/lab/Masonry'
import TimeLine from '../components/ui/TimeLine'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const MediaLibraryPage = ({ userData }) => {
  return (
    <div>
      <div>Media Library</div>
      <Box sx={{ width: '100%' }}>
        <Masonry columns={2} spacing={2}>
 

              <Item>
                <DisplayMedia userData={userData} />
              </Item>

              <Item>
                <TimeLine />
              </Item>

        </Masonry>
      </Box>
    </div>
  )
}

export default MediaLibraryPage
