import React from 'react'
import { Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'col1', headerName: 'Sale Item', width: 200 },
  { field: 'col2', headerName: 'Pay Out', width: 100 },
  { field: 'col3', headerName: 'Date Purchased', width: 200 },
  { field: 'col4', headerName: 'Status', width: 150 },
  { field: 'col5', headerName: 'Items', width: 150 },
]

const UserSaleDataGrid = ({ userSaleData }) => {
  const userSaleDataGrid = userSaleData?.map((sale) => {
    const newDate = new Date(sale.saleDate).toDateString()
    const payout = `$${(
      Number(parseFloat(sale.saleTotal.$numberDecimal)) * sale.quantity
    ).toFixed(2)}`
    let checkFulfilled
    if (sale.fulfilled === 'true') {
      checkFulfilled = 'Processed'
    } else {
      checkFulfilled = 'Unfulfilled'
    }

    return {
      id: sale._id,
      col1: sale.saleItemTitle,
      col2: payout,
      col3: newDate,
      col4: checkFulfilled,
      col5: sale.quantity,
    }
  })

  return (
    <Card sx={{ borderRadius: '25px', width: '74%' }}>
      {/* <Box> */}
      {userSaleData ? (
        <DataGrid rows={userSaleDataGrid} columns={columns} />
      ) : (
        ''
      )}
      {/* </Box> */}
    </Card>

    // <Card
    //   sx={{ width: '100%', padding: ' 0 20px 0 20px', borderRadius: '25px' }}
    // >
    /* <CardContent> */
    // <div>

    /* </div> */
    /* </CardContent> */
    /* </Card> */
  )
}

export default UserSaleDataGrid
