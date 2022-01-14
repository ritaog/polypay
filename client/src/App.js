import React from 'react'
import Welcome from './components/Welcome'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {

  // const [ user, setUser ] = useState()

  // useEffect(() => {
  //   const getUser = async () => {
  //     setUser()
  //   }
  //   if (!user) {
  //     getUser()
  //   }
    
  // }, [user])

  const user = true

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Welcome /> : <LoginPage />} />
        {/* <Route path="/Home" element={} /> */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
