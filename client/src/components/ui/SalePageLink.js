import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import copy from 'copy-to-clipboard'
import { TextField, IconButton, Box, Button, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'

const SalePageLink = ({ userData }) => {
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState()

  useEffect(() => {
    setLink(`polypay.herokuapp.com/sales/${userData._id}`)
  }, [userData])

  const copyHandler = () => {
    copy(link)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose} />
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '450px' }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Link Copied!"
        action={action}
      />
      <TextField
        id="sale-page-link"
        label="Storefront Link"
        variant="outlined"
        size="small"
        fullWidth
        value={link ? link : ''}
      />
      <IconButton onClick={copyHandler} sx={{ paddingLeft: '10px' }}>
        <ContentCopyIcon />
      </IconButton>
    </Box>
  )
}

export default SalePageLink
