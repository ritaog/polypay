import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import LinkAccountPage from './pages/LinkAccountPage'
import SchedulePostPage from './pages/SchedulePostPage'
import DisplayItemsPage from './pages/DisplayItemsPage'
import CheckoutPage from './pages/CheckoutPage'
import ResponsiveAppBar from './navigation/ResponsiveAppBar'


const App = () => {
  //user state set by user login
  const [user, setUser] = useState({})
  //function that sets user: this function is passed to the "/"
  const getObject = (userObj) => {
    console.log(userObj)
    setUser(userObj)
  }

  // useEffect checks browser for cookies on reload and if there is a passport cookie the user state is retrieved
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('auth/getLoggedInUser')
      setUser(response.data)
    }
    getUser()
  }, [])

  return (
    <BrowserRouter>
      <ResponsiveAppBar userData={user} getUserState={getObject}/>
      <Routes>
        <Route path="/" element={<HomePage userData={user} />} />
        <Route
          path="/login"
          element={<LoginPage userData={user} getObject={getObject} />}
        />
        <Route
          path="/linkaccounts"
          element={<LinkAccountPage userData={user} />}
        />
        <Route
          path="/schedulepost"
          element={<SchedulePostPage userData={user} />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/portfolio"
          element={<DisplayItemsPage userData={user} />}
        />
        <Route path="/portfolio/:id" element={<DisplayItemsPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
