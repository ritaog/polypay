import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardContent } from '@mui/material'
import PostInfoModal from '../modals/PostInfoModal'
import axios from 'axios'
import { useEffect, useState } from 'react'

const MediaCalender = ({ userData }) => {
  const [postEvents, setPostEvents] = useState()
  const [postInfo, setPostInfo] = useState()
  const [editDisabled, setEditDisabled] = useState(true)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [open, setOpen] = React.useState(false)

  
  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('/saleItem/listSaleItemsByLoggedUser')
      const events = response.data.map((post) => {
        return {
          title: post.postTitle,
          date: post.postTime,
          postData: post,
        }
      })
      setPostEvents(events)
    }
    if (userData) {
      getPosts()
    }
  }, [userData])

  const handleClose = () => {
    setOpen(false)
    setEditDisabled(true)
    setSubmitDisabled(true)
  }

  const handleDateSelect = (e) => {
    setPostInfo(e.event._def.extendedProps.postData)
    setOpen(true)
    console.log('calenderApi', e)
  }
  
  const handleEdit = () => {
    if (postInfo.available === 'Scheduled') {
      setEditDisabled(false)
      setSubmitDisabled(false)
    }
  }

  const datePickHandler = (e) => {
    console.log('e', e)
    // calender.goToDate(e.date)
  }

  // console.log('postEvents', postEvents)
  return (
    <Card
      sx={{
        borderRadius: '25px',
        height: '650px',
        width: '100%',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <PostInfoModal
        open={open}
        handleClose={handleClose}
        postInfo={postInfo}
        userData={userData}
        handleEdit={handleEdit}
        editDisabled={editDisabled}
        setEditDisabled={setEditDisabled}
        submitDisabled={submitDisabled}
        setSubmitDisabled={setSubmitDisabled}
      />
      <CardContent>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          editable={true}
          selectMirror={true}
          navLinks={true}
          eventClick={(e) => {
            handleDateSelect(e)
          }}
          initialView="dayGridMonth"
          height={620}
          events={postEvents}
          dateClick={(e) => {
            datePickHandler(e)
          }}
        />
      </CardContent>
    </Card>
  )
}

export default MediaCalender
