import React from 'react'
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import './UserDataGrid.css'

const columns = [
  { field: 'col1', headerName: 'User Name', width: 150 },
  { field: 'col2', headerName: 'User Type', width: 150 },
  { field: 'col3', headerName: 'Company Name', width: 150 },
  { field: 'col4', headerName: 'Company Address', width: 150 },
  { field: 'col5', headerName: 'Company Type', width: 150 },
  { field: 'col6', headerName: 'Email Address', width: 150 },
  { field: 'col7', headerName: 'password', width: 150 },
  { field: 'col8', headerName: 'Phone No', width: 150 },
]

const UserDataGrid = () => {
  const [totalUserData, setTotalUserData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/user/getAllUser')
      const editedTotalUserData = response.data.map((user) => {
        return {
          id: user._id,
          col1: user.userName,
          col2: user.userType,
          col3: user.companyName,
          col4: user.companyAddress,
          col5: user.companyType,
          col6: user.emailAddress,
          col7: user.password,
          col8: user.phoneNo,
        }
      })
      // console.log('editedTotalUserData', editedTotalUserData)
      setTotalUserData(editedTotalUserData)
    }
    getData()
  }, [])

  return (
    <div className="style">
      <h1 className="title">Admin Dashboard</h1>
      <DataGrid rows={totalUserData} columns={columns} />
    </div>
  )
}

export default UserDataGrid
