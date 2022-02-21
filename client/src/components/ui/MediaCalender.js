import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardContent } from '@mui/material'
import PostInfoModal from '../modals/PostInfoModal'
import axios from 'axios'
import { useEffect, useState } from 'react'

const MediaCalender = ({userData}) => {
  const [postEvents, setPostEvents] = useState()
  const [postInfo, setPostInfo] = useState()
  const [editDisabled, setEditDisabled] = useState(true)
  const [submitDisabled, setSubmitDisabled] = useState(true)
   const [open, setOpen] = React.useState(false)
   const handleClose = () => {
     setOpen(false)
     setEditDisabled(true)
     setSubmitDisabled(true)
    }

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('/saleItem/listSaleItemsByLoggedUser')
      const events = response.data.map((post) => {
        return ({
          title: post.postTitle,
          date: post.postTime,
          postData: post
        })
      })
      setPostEvents(events)
    }
    if (userData) {
      getPosts()
    }
  }, [userData])

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
          selectable={true}
          selectMirror={true}
          eventClick={(e) => {
            handleDateSelect(e)
          }}
          initialView="dayGridMonth"
          height={825}
          events={postEvents}
        />
      </CardContent>
    </Card>
  )
}

export default MediaCalender
