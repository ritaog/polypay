import * as React from 'react'
// import InstagramEmbed from 'react-instagram-embed'

// import ImageList from '@mui/material/ImageList'
// import ImageListItem from '@mui/material/ImageListItem'
// import ImageListItemBar from '@mui/material/ImageListItemBar'
// import ListSubheader from '@mui/material/ListSubheader'
// import IconButton from '@mui/material/IconButton'
// import InstagramIcon from '@mui/icons-material/Instagram'
import { Card, CardContent, Grid, Typography, Box, Avatar } from '@mui/material'

import axios from 'axios'
import { useState, useEffect } from 'react'

export default function SaleListUser({ userData }) {
  const [recentPosts, setRecentPosts] = useState()

  useEffect(() => {
    const getInstaMedia = async () => {
      const response = await axios.get(
        `/media/getInstagramPostsByLoggedInUser/${userData._id}`
      )
      console.log('response.data', response.data)
      setRecentPosts(response.data)
    }
    if (userData) {
      getInstaMedia()
    }
  }, [])

  const postDisplay = (
    <Box>
      <Box sx={{ height: '60px', width: '340px' }}>
        <Box sx={{padding: '14px 16px'}}>
          {recentPosts ? (
            <Avatar
              alt="user-image"
              src={recentPosts.userData.profile_picture_url}
              sx={{
                width: '32px',
                height: '32px',
                border: '1px solid lightGray',
              }}
            />
          ) : (
            ''
          )}
          {/* <Typography>TopBar</Typography> */}
        </Box>
      </Box>
      <Box sx={{ height: '425px', width: '340px' }}>
        <Typography>image</Typography>
      </Box>
      <Box sx={{ height: '42px', width: '340px' }}>
        <Typography>insights</Typography>
      </Box>
      <Box sx={{ height: '42px', width: '340px' }}>
        <Typography>likes and postDate</Typography>
      </Box>
      <Box sx={{ height: '42px', width: '340px' }}>
        <Typography>Description</Typography>
      </Box>
      <Box sx={{ height: '100px', width: '340px' }}>
        <Typography>comments</Typography>
      </Box>
    </Box>
  )

  return (
    <div>
      <Card
        sx={{
          borderRadius: '25px',
          height: '650px',
          width: '340px',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <CardContent sx={{ padding: '0 0' }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h4"
                component="div"
                sx={{ margin: '5px 5px' }}
              >
                Recent Posts
              </Typography>
            </Grid>
            <Box></Box>
          </Grid>
          <Grid container>{postDisplay}</Grid>
        </CardContent>
      </Card>

      {/* <ImageList sx={{ width: '100%' }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">
            {userData ? `${userData.userName}'s Recent Posts` : ''}
          </ListSubheader>
        </ImageListItem>
        {saleItems
          ? saleItems.map((item, index) => (
              <ImageListItem key={item._id + index + 'user'}>
                <img
                  src={`${item.photos[0]}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.photos[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.description}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={`Price: $ ${parseFloat(item.price.$numberDecimal)}`}
                  subtitle={'Status: ' + item.available}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InstagramIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          : ''}
      </ImageList> */}
    </div>
  )
}
