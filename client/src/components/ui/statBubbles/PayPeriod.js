import { Typography, Grid } from '@mui/material'
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded'

const PayPeriod = ({ userSaleData }) => {
  const monthlySales = () => {
    let todayMonth = new Date().getMonth()
    let totalSales = 0.0
    userSaleData?.map((sale) => {
      let dateCheck = new Date(sale.saleDate).getMonth()
      if (dateCheck === todayMonth) {
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
          Pay Period Sales
        </Typography>
        <Typography variant="h6" align="left">
          {`$${monthlySales()}`}
        </Typography>
      </Grid>
      <Grid item>
        <AnalyticsRoundedIcon sx={{ fontSize: '50px', color: 'lightGreen' }} />
      </Grid>
    </Grid>
  )
}

export default PayPeriod
