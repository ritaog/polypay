import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
// import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
// import Avatar from '@mui/material/Avatar'
// import Tooltip from '@mui/material/Tooltip'
import Image from 'mui-image'

const SalePageHeader = ({children, vendorName}) => {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0 }}>
     
                <Box sx={{ paddingRight: '10px' }}>
                  <Image
                    src="/images/polypay_armadillo.png"
                    alt="otherlogo"
                    height="50px"
                    width="50px"
                    fit="fill"
                  />
                </Box>
       
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex', color: 'black' },
              }}
            >
              {vendorName ? vendorName : ''}
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none', color: 'black' },
              }}
            >
              {vendorName ? vendorName : ''}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ paddingTop: '10px' }}>{children}</Box>
    </Box>
  )
}

export default SalePageHeader
