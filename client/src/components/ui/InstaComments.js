import React from 'react'
import { Typography, Box, Link } from '@mui/material'

const InstaComments = ({post, postedTimeHandler, handleReply}) => {
  return (
    <Box
      sx={{
        height: '150px',
        width: '340px',
        padding: '10px 10px 0 10px',
        overflowY: 'scroll',
        borderBottom: '5px solid black',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {post.comments[0] ? (
        post.comments.map((comment) => {
          return (
            <Box key={comment.id} sx={{ paddingBottom: '10px' }}>
              <Typography
                variant="subtitle2"
                component="span"
              >{`${comment.from.username}  `}</Typography>
              <Typography
                variant="subtitle1"
                component="span"
              >{`${comment.text}`}</Typography>
              <Typography variant="caption" component="div">
                {`${postedTimeHandler(comment.timestamp)} - `}{' '}
                <Link
                  component="button"
                  variant="caption"
                  onClick={() => {
                    handleReply(comment.id, comment.from)
                  }}
                >
                  reply
                </Link>
              </Typography>
            </Box>
          )
        })
      ) : (
        <Typography variant="caption">No Comments</Typography>
      )}
    </Box>
  )
}

export default InstaComments