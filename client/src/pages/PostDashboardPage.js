import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import InstaRecentPosts from '../components/ui/recentInstaDisplay/InstaRecentPosts'
import TodaysSales from '../components/ui/statBubbles/TodaysSales'
import Views from '../components/ui/statBubbles/Views'
import axios from 'axios'
import PayPeriod from '../components/ui/statBubbles/PayPeriod'
import Scheduled from '../components/ui/statBubbles/Scheduled'
import UserSaleDataGrid from '../components/ui/UserSaleDataGrid'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [dailyInstaData, setDailyInstaData] = useState()
  const [scheduledPosts, setScheduledPosts] = useState()
  const [userSaleData, setUserSaleData] = useState()
  const [recentPosts, setRecentPosts] = useState({ postData: [] })

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
    const getInstaMedia = async () => {
      try {
        const response = await axios.get(
          `/media/getInstagramPostsByLoggedInUser`
        )
        // console.log('response.data', response)
        setRecentPosts(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    if (userData) {
      getInstaMedia()
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

  useEffect(() => {
    const getSaleData = async () => {
      const response = await axios.get('/saleData/listSaleDataByLoggedUser')
      console.log('response', response)
      if (response.statusText === 'Accepted') {
        setUserSaleData(response.data)
      }
    }
    if (userData) {
      getSaleData()
    }
  }, [userData])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '25%', minWidth: '220px', padding: '0 20px 20px 0' }}>
          <Item>
            <TodaysSales userSaleData={userSaleData} />
          </Item>
        </Box>
        <Box sx={{ width: '25%', minWidth: '220px', padding: '0 20px 20px 0' }}>
          <Item>
            <Views dailyInstaData={dailyInstaData} />
          </Item>
        </Box>
        <Box sx={{ width: '25%', minWidth: '220px', padding: '0 20px 20px 0' }}>
          <Item>
            <PayPeriod userSaleData={userSaleData} />
          </Item>
        </Box>
        <Box
          onClick={() => {
            navigate('/schedule-post')
          }}
          sx={{
            width: '25%',
            minWidth: '220px',
            padding: '0 20px 20px 0',
            cursor: 'pointer',
          }}
        >
          <Item>
            <Scheduled scheduledPosts={scheduledPosts} />
          </Item>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ paddingRight: '20px' }}>
          <InstaRecentPosts userData={userData} recentPosts={recentPosts}/>
        </Box>
        <UserSaleDataGrid userSaleData={userSaleData} />
      </Box>
    </Box>
  )
}

export default PostDashboardPage
