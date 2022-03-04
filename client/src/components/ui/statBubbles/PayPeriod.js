import { Typography, Grid } from '@mui/material'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'

const PayPeriod = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item sx={{ paddingLeft: '10px' }}>
        <Typography variant="caption" align="left">
          Pay Period Sales
        </Typography>
        <Typography variant="h6" align="left">
          $1,568.95
        </Typography>
      </Grid>
      <Grid item>
        <AnalyticsRoundedIcon sx={{ fontSize: '50px', color: 'lightGreen' }} />
      </Grid>
    </Grid>
  )
}

export default PayPeriod
