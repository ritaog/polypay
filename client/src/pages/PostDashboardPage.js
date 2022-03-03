import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import InstaRecentPosts from '../components/ui/recentInstaDisplay/InstaRecentPosts'
import TodaysSales from '../components/ui/statBubbles/TodaysSales'
import Views from '../components/ui/statBubbles/Views'
import axios from 'axios'
import PayPeriod from '../components/ui/statBubbles/PayPeriod'
import Scheduled from '../components/ui/statBubbles/Scheduled'
// import AddImage from '../components/ui/AddImage'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '20px',
  height: '70px',
}))

const PostDashboardPage = ({ userData }) => {
  const [dailyInstaData, setDailyInstaData] = useState()
  const [scheduledPosts, setScheduledPosts] = useState()

  useEffect(() => {
    const getDailyData = async () => {
      const response = await axios.get('/media/getDailyData')
      if (response.statusText === 'OK') {
        setDailyInstaData(response.data.data)
      }
    }
    if (userData) {
      getDailyData()
    }
  }, [userData])

  useEffect(() => {
    const getScheduled = async () => {
      const response = await axios.get('/saleItem/getScheduled')
      if (response.statusText === 'OK') {
        setScheduledPosts(response.data)
      }
    }
    if (userData) {
      getScheduled()
    }
  }, [userData])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '25%', minWidth: '220px', padding: '0 20px 20px 0' }}>
          <Item>
            <TodaysSales />
          </Item>
        </Box>
        <Box sx={{ width: '25%', minWidth: '220px', padding: '0 20px 20px 0' }}>
          <Item>
            <Views dailyInstaData={dailyInstaData} />
          </Item>
        </Box>
        <Box sx={{ width: '25%', minWidth: '220px', padding: '0 20px 20px 0' }}>
          <Item>
            <PayPeriod />
          </Item>
        </Box>
        <Box sx={{ width: '25%', minWidth: '220px', padding: '0 20px 20px 0' }}>
          <Item>
            <Scheduled scheduledPosts={scheduledPosts} />
          </Item>
        </Box>
      </Box>

      <InstaRecentPosts userData={userData} />
    </Box>
  )
}

export default PostDashboardPage
