import { Typography, Grid } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'

const TodaysSales = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item sx={{paddingLeft: '10px'}}>
        <Typography variant="caption" align="left">
          Today's Sales
        </Typography>
        <Typography variant="h6" align="left">
          $488.95
        </Typography>
      </Grid>
      <Grid item>
        <PaidIcon sx={{fontSize: "50px", color: 'lightGreen'}} />
      </Grid>
    </Grid>
  )
}

export default TodaysSales
