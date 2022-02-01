import * as React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import DisplayMedia from '../components/ui/DisplayMedia'
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <DisplayMedia userData={userData} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item><TimeLine /></Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default MediaLibraryPage
