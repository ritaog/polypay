import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardContent } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

const MediaCalender = ({userData}) => {
  const [postEvents, setPostEvents] = useState()

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('/saleItem/listSaleItemsByLoggedUser')
      const events = response.data.map((post) => {
        return ({
          title: post.postTitle,
          date: post.postTime
        })
      })
      setPostEvents(events)
    }
    if (userData) {
      getPosts()
    }
  }, [userData])

  const handleDateSelect = (e) => {
    console.log("selected", e.event._instance.range.start)
    console.log('calenderApi', e)
  }

  console.log('postEvents', postEvents)
  return (
    <Card sx={{ borderRadius: '25px', height: '875px' }}>
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
          eventClick={(e) => {handleDateSelect(e)}}
          initialView="dayGridMonth"
          height={825}
          events={postEvents}
        />
      </CardContent>
    </Card>
  )
}

export default MediaCalender
