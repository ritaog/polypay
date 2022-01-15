import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HomePage = () => {
  const [message, setMessage] = useState('')

  //grabs data from backend once page is rendered
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('vendor/welcome')
      setMessage(response.data)
    }

    getData()
  }, [])

  return (
    <div>
      <h1>Polypay says: {message}</h1>
    </div>
  )
}

export default HomePage
