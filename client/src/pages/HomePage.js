import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HomePage = ({userData}) => {
  const [message, setMessage] = useState()
  //grabs data from backend once page is rendered
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('vendor/welcome')
      setMessage(response.data)
    }
      getData()
  }, [])

  //  useEffect(() => {
  //    const getUser = async () => {
  //      const response = await axios.get('vendor/welcome')
  //      setMessage(response.data)
  //    }

  //    getUser()
  //  }, [])

  return (
    <div>
      <h1>Polypay says: {message}</h1>
      <h1>
        Hello: {JSON.stringify(userData.vendorName)} please connect your instagram account
        through facebook.
      </h1>
    </div>
  )
}

export default HomePage
