import { Typography, Grid } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'

const TodaysSales = ({ userSaleData }) => {
  const dailySales = () => {
    let todayDate = new Date().toDateString()
    let totalSales = 0.0
    userSaleData?.map((sale) => {
      let dateCheck = new Date(sale.saleDate).toDateString()
      if (dateCheck === todayDate) {
        totalSales += Number(parseFloat(sale.saleTotal.$numberDecimal))
      }
    })
    return totalSales.toFixed(2)
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item sx={{ paddingLeft: '10px' }}>
        <Typography variant="caption" align="left">
          Today's Sales
        </Typography>
        <Typography variant="h6" align="left">
          {`$${dailySales()}`}
        </Typography>
      </Grid>
      <Grid item>
        <PaidIcon sx={{ fontSize: '50px', color: 'lightGreen' }} />
      </Grid>
    </Grid>
  )
}

export default TodaysSales
