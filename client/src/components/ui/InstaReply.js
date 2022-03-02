import React from 'react'
import { Box, TextField, Button } from '@mui/material'

const InstaReply = ({comment, handlePost, setComment, commentFrom, setCommentId}) => {
  console.log('comment', comment)
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        width: '340px',
        borderTop: '1px solid lightGray',
        borderBottom: '5px solid black',
        paddingLeft: '10px',
      }}
    >
      {/* Comment on post input */}

      <TextField
        id="standard-basic"
        placeholder={`Reply to ${commentFrom.username}`}
        multiline
        rows={2}
        variant="standard"
        value={comment}
        // disableUnderline="true"
        // inputProps={{ disableUnderline: 'true' }}
        sx={{ width: '250px' }}
        onChange={(e) => {
          setComment(e.target.value)
        }}
      />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box>
          <Button
            disabled={!comment}
            onClick={handlePost}
            sx={{ fontSize: '10px', padding: '0px' }}
          >
            Post
          </Button>
        </Box>
        <Box>
          <Button onClick={() => {setCommentId(null)}} sx={{ fontSize: '10px', padding: '0px' }}>Back</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default InstaReply