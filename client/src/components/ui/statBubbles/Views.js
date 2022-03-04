import { Typography, Grid } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

const Views = ({ dailyInstaData }) => {
  // console.log('dailyInstaData', dailyInstaData)
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item sx={{ paddingLeft: '10px' }}>
        <Typography variant="caption" align="left">
          Today's Profile Views
        </Typography>
        {dailyInstaData ? (
          <Typography variant="h6" align="left">{dailyInstaData[3].values[0].value}</Typography>
        ) : (
          ''
        )}
      </Grid>
      <Grid item>
        <AccountCircleOutlinedIcon sx={{ fontSize: '50px', color: 'orange' }} />
      </Grid>
    </Grid>
  )
}

export default Views
