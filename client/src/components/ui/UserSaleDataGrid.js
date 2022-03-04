import React from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'col1', headerName: 'Sale Item', width: 150 },
  { field: 'col2', headerName: 'Date Purchased', width: 150 },
  { field: 'col3', headerName: 'Status', width: 150 },
  { field: 'col4', headerName: 'Items', width: 150 },
]

const UserSaleDataGrid = ({ userSaleData }) => {
  const userSaleDataGrid = userSaleData?.map((sale) => {
    return {
      id: sale._id,
      col1: sale.saleItemTitle,
      col2: sale.saleDate,
      col3: sale.fulfilled,
      col4: sale.quantity,
    }
  })



  return (
    <Box sx={{width: '100%', padding: ' 0 20px 0 20px'}}>
      <DataGrid rows={userSaleDataGrid} columns={columns} />
    </Box>
  )
}

export default UserSaleDataGrid
