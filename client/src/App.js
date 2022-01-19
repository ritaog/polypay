import React from 'react'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import LinkAccountPage from './pages/LinkAccountPage'
import SchedulePostPage from './pages/SchedulePostPage'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const App = () => {

  const [ user, setUser ] = useState({})
   const getObject = (userObj) => {
    console.log(userObj)
    setUser(userObj)
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('auth/getLoggedInUser')
      setUser(response.data)
    }
      getUser()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage userData={user} getObject={getObject}/>} />
        <Route path="/Home" element={<HomePage userData={user} /> } />
        <Route path="/LinkAccounts" element={<LinkAccountPage userData={user} />} />
        <Route path="/SchedulePost" element={<SchedulePostPage userData={user} />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
