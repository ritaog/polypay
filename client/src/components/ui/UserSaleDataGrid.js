import React from 'react'
import { Card, Box } from '@mui/material'
import { useState } from 'react'
import {
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DataGridButtons from './DataGridButtons'

const columns = [
  { field: 'col1', headerName: 'Sale Item', width: 200 },
  { field: 'col2', headerName: 'Pay Out', width: 100 },
  { field: 'col3', headerName: 'Date Purchased', width: 200 },
  { field: 'col4', headerName: 'Status', width: 150 },
  { field: 'col5', headerName: 'Items', width: 150 },
]


const UserSaleDataGrid = ({ userSaleData }) => {
  const [rowSelect, setRowSelect] = useState()
  const navigate = useNavigate()

  const userSaleDataGrid = userSaleData?.map((sale) => {
    const newDate = new Date(sale.saleDate).toDateString()
    const payout = `$${(
      Number(parseFloat(sale.saleTotal.$numberDecimal)) * sale.quantity
    ).toFixed(2)}`
    let checkFulfilled
    if (sale.fulfilled === 'false') {
      checkFulfilled = 'Unfulfilled'
    } else if (sale.fulfilled === 'Completed') {
      checkFulfilled = 'Completed'
    } else if (sale.fulfilled === 'Processed') {
      checkFulfilled = 'Processed'
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

  const handleRowClick = (e) => {
    if (!rowSelect) {
      setRowSelect([e.id])
    } else {
      const selectCheck = rowSelect.includes(e.id)
      if (selectCheck) {
        const checkId = (id) => {
          if (id !== e.id) {
            return e.id
          }
        }
        let newArray = rowSelect.filter(checkId)
        console.log('newArray', newArray)
        if (!newArray[0]) {
          setRowSelect(null)
        } else {
          setRowSelect(newArray)
        }
      } else {
        setRowSelect([...rowSelect, e.id])
      }
    }
  }

  const handleCompleted = async () => {
    const response = await axios.put('/saleData/updateSaleDataByIds', {
      ids: rowSelect,
      fulfilled: 'Completed',
    })
    if (response.statusText === 'Created') {
      navigate(0)
    }
  }

  const handleProcessed = async () => {
    const response = await axios.put('/saleData/updateSaleDataByIds', {
      ids: rowSelect,
      fulfilled: 'Processed',
    })
    console.log('response', response)
    if (response.statusText === 'Created') {
      navigate(0)
    }
  }

  // const handleRemove = async () => {
  //   console.log('rowSelect', rowSelect)
  //   const response = await axios.delete('/saleData/deleteSaleDataByIds', rowSelect)
  //   console.log('response', response)
  //   if (response.statusText === 'Created') {

  //     navigate(0)
  //   }
  // }

  return (
    <Box sx={{ width: '100%', paddingRight: '20px', minWidth: '650px' }}>
      <Box sx={{ height: '50px' }}>
        <DataGridButtons
          handleCompleted={handleCompleted}
          handleProcessed={handleProcessed}
          rowSelect={rowSelect}
        />
      </Box>
      <Card sx={{ borderRadius: '25px', height: '600px' }}>
        {userSaleData ? (
          <DataGrid
            rows={userSaleDataGrid}
            columns={columns}
            checkboxSelection={true}
            components={{ Toolbar: GridToolbar }}
            onRowClick={(e) => {
              handleRowClick(e)
            }}
          />
        ) : (
          ''
        )}
      </Card>
    </Box>
  )
}

export default UserSaleDataGrid
