import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CustomizedTimeline({ userData }) {
  const [timeline, setTimeline] = useState([])
  const [posts, setPosts] = useState([])

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const createYear = (year) => {
    let tempArr = []
    for (let index = 0; index < 12; index++) {
      tempArr.push(new Date(year, index))
    }
    return tempArr
  }

  const sortTimeLine = (timelineMonths, userPosts) => {
    
    let monthsInSeconds = timelineMonths.map((month) => {
      return [month.getTime(), month]
    })

    let postsInSeconds = userPosts.map((post) => {
      let postDate = new Date(post.postTime)
      return [postDate.getTime(), post]
    })

    let combinedDates = [...monthsInSeconds, ...postsInSeconds]

    combinedDates.sort()

    let sortedTimePoints = combinedDates.map((date) => {
      return date[1]
    })

    return sortedTimePoints
  }

  useEffect(() => {
    if (!timeline[0]) {
      setTimeline(createYear(2022))
    }
  }, [timeline])

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('/saleItem/listSaleItemsByLoggedUser')
      setPosts(response.data)
    }
    if (userData) {
      getPosts()
    }
  }, [userData])

  const sortedTimeline = sortTimeLine(timeline, posts)

  let timeLineDisplay = sortedTimeline.map((timePoint, index) => {
    return timePoint._id ? (
      <TimelineItem key={timePoint + index + 'timeline'}>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {`${months[new Date(timePoint.postTime).getMonth()]} ${new Date(
            timePoint.postTime
          ).getDate()} at ${new Date(timePoint.postTime).getHours()}:${new Date(
            timePoint.postTime
          ).getMinutes()}`}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h12" component="span">
            {timePoint.postTitle}
          </Typography>
          <Typography variant="caption" component="div">
            {'Status: ' + timePoint.available}
          </Typography>
        </TimelineContent>
      </TimelineItem>
    ) : (
      <TimelineItem key={index}>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="h4"
          color="text.secondary"
        >
          {months[timePoint.getMonth()]}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot></TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span"></Typography>
        </TimelineContent>
      </TimelineItem>
    )
  })

  // console.log('timeLineDisplay', timeLineDisplay);

  return <Timeline position="right">{timeLineDisplay}</Timeline>
}
