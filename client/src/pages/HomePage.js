import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const HomePage = ({ userData }) => {
  const [message, setMessage] = useState()

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
      <h1>
        Hello: {userData ? JSON.stringify(userData.userName) : "Guest"}
  
      </h1>
      <div>
        <Link to={'/LinkAccounts'}>Link Your Account To Your Platforms</Link>
      </div>
      <div>
        <Link to={'/SchedulePost'}>Schedule A Post</Link>
      </div>
    </div>
  )
}

export default HomePage
