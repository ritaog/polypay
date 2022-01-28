import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import ResponsiveAppBar from '../navigation/ResponsiveAppBar'

const HomePage = ({ userData }) => {
  const [message, setMessage] = useState()

  //grabs data from backend once page is rendered
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('user/welcome')
      setMessage(response.data)
    }
    getData()
  }, [])

  return (
    <div>
      <h1>Polypay says: {message}</h1>
      <div>
        <Link to={'/linkaccounts'}>Link Your Account To Your Platforms</Link>
      </div>
      <div>
        <Link to={'/schedulepost'}>Schedule A Post</Link>
      </div>

      <div>
        <Link to={'/portfolio'}>View all items for sale</Link>
      </div>

      <div>
        <Link to={'/login'}>login/signup</Link>
      </div>
    </div>
  )
}

export default HomePage
