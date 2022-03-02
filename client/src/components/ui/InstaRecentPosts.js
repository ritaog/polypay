import * as React from 'react'

import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Avatar,
  Link,
} from '@mui/material'
import Image from 'mui-image'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InstaComments from './InstaComments'
import InstaReply from './InstaReply'

export default function InstaRecentPosts({ userData }) {
  const navigate = useNavigate()
  const [recentPosts, setRecentPosts] = useState({ postData: [], userData: [] })
  const [comment, setComment] = useState()
  const [commentId, setCommentId] = useState()
  const [commentFrom, setCommentFrom] = useState()

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
  }, [userData])

  const postedTimeHandler = (postedDate) => {
    let currentDate = new Date()
    let postDate = new Date(postedDate)
    let timeDifference = currentDate.getTime() - postDate.getTime()
    let timeDifferenceDays = Math.floor(timeDifference / (1000 * 3600 * 24))
    let timeDifferenceHours = Math.floor(timeDifference / (1000 * 3600))
    let timeDifferenceMin = Math.floor(timeDifference / (1000 * 60))
    if (timeDifferenceDays >= 1) {
      return `${timeDifferenceDays} day(s) ago`
    } else if (timeDifferenceHours >= 1) {
      return `${timeDifferenceHours} hour(s) ago`
    } else {
      return `${timeDifferenceMin} minute(s) ago`
    }
  }

  const handleReply = (id, from) => {
    setCommentId(id)
    setCommentFrom(from)
  }

  const handlePost = async () => {
    const commentRes = await axios.post(
      `/media/reply?comment_id=${commentId}&user_id=${userData.permanentToken}&message=${comment}`
    )
    if (commentRes.statusText === 'Created') {
      navigate(0)
    } else {
      console.log('replyError')
    }
  }

  const postDisplay = recentPosts.postData.map((post) => {
    return (
      <Box key={post.id}>
        {/* Instagram user icon and header and followers */}

        <Box
          sx={{
            height: '50px',
            width: '340px',
            borderBottom: '1px solid lightGray',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              margin: '6px 16px 0 14px',
            }}
          >
            {post ? (
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
            <Box>
              <Box>
                {post ? (
                  <Typography variant="subtitle2" sx={{ marginLeft: '12px' }}>
                    {recentPosts.userData.username}
                  </Typography>
                ) : (
                  ''
                )}
              </Box>
              <Box>
                {post ? (
                  <Typography
                    variant="caption"
                    sx={{ marginLeft: '12px', height: '5px', color: 'gray' }}
                  >{`${recentPosts.userData.followers_count} followers`}</Typography>
                ) : (
                  ''
                )}
              </Box>
            </Box>
            <Box>
              {post ? (
                <Typography
                  variant="caption"
                  sx={{ marginLeft: '12px', height: '5px', color: 'gray' }}
                >{`Posted on: ${new Date(
                  post.timestamp
                ).toDateString()}`}</Typography>
              ) : (
                ''
              )}
            </Box>
          </Box>
        </Box>

        {/* instagram post image */}

        <Box sx={{ height: '425px', width: '340px' }}>
          {post ? <Image alt="post" src={post.media_url} /> : ''}
        </Box>

        {/* view on instagram link */}

        <Box
          sx={{
            height: '42px',
            width: '340px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid lightGray',
            padding: '10px',
          }}
        >
          {post ? (
            <Link href={post.permalink} underline="none">
              View on Instagram
            </Link>
          ) : (
            ''
          )}
        </Box>

        {/* likes and comment count */}

        <Box sx={{ height: '60px', width: '340px' }}>
          <Box sx={{ padding: '10px 10px 0 10px' }}>
            {post ? (
              <Typography variant="caption">{`You have ${post.like_count} likes and ${post.comments_count} comments`}</Typography>
            ) : (
              ''
            )}
          </Box>
          <Box sx={{ padding: '0 10px 0 10px' }}>
            {post ? (
              <Typography variant="caption">{`Posted ${postedTimeHandler(
                post.timestamp
              )}`}</Typography>
            ) : (
              ''
            )}
          </Box>
        </Box>

        {/* instagram caption */}

        <Box
          sx={{
            width: '340px',
            padding: '10px',
            borderTop: '1px solid lightGray',
            borderBottom: '1px solid lightGray',
          }}
        >
          {post ? <Typography variant="body1">{post.caption}</Typography> : ''}
        </Box>

        {/* reply to comments */}
        {commentId ? (
          <InstaReply
            commentFrom={commentFrom}
            comment={comment}
            handlePost={handlePost}
            setComment={setComment}
            setCommentId={setCommentId}
          />
        ) : (
          <InstaComments
            post={post}
            postedTimeHandler={postedTimeHandler}
            handleReply={handleReply}
          />
        )}
      </Box>
    )
  })

  return (
    <div>
      <Card
        sx={{
          borderRadius: '25px',
          height: '650px',
          width: '340px',
        }}
      >
        <CardContent sx={{ padding: '0 0' }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderBottom: '1px solid lightGray',
              boxShadow: '0 1px 1px lightGray',
            }}
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
          </Grid>
          <Box
            sx={{
              width: '340px',
              height: '598px',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Grid container>{postDisplay}</Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}
