import { Typography, Grid } from '@mui/material'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'

const Scheduled = ({scheduledPosts}) => {
  // console.log('s', s)
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item sx={{ paddingLeft: '10px' }}>
        <Typography variant="caption" align="left">
          Scheduled Posts
        </Typography>
        {scheduledPosts ? (
          <Typography variant="h6" align="left">
            {scheduledPosts.length}
          </Typography>
        ) : (
          'Loading...'
        )}
      </Grid>
      <Grid item>
        <EventAvailableRoundedIcon sx={{ fontSize: '50px', color: 'Red' }} />
      </Grid>
    </Grid>
  )
}

export default Scheduled
