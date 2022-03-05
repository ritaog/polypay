import React from 'react'
import { Card, Button, Typography, Box, Divider } from '@mui/material'

const DataGridButtons = ({handleProcessed, handleCompleted, rowSelect}) => {
  return (
    <Card
      sx={{
        borderRadius: '25px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{display: 'flex'}}>
        <Typography variant="h6" sx={{ marginLeft: '10px' }}>
          Sale History
        </Typography>
      </Box>
      <Box sx={{ marginRight: '10px', display: 'flex' }}>
        <Button sx={{ color: 'gray' }} onClick={handleProcessed} disabled={!rowSelect}>
          Mark As Processed
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button sx={{ color: 'gray' }} onClick={handleCompleted} disabled={!rowSelect}>
          Mark As Completed
        </Button>
        {/* <Divider orientation="vertical" variant="middle" flexItem />
        <Button sx={{ color: 'gray' }} onClick={handleRemove}>Remove From Table</Button> */}
      </Box>
    </Card>
  )
}

export default DataGridButtons
