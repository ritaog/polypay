import React from 'react'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
// import { useState, useEffect } from 'react'
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
        <Route path="/" element={ <LoginPage />} />
        <Route path="/Home" element={<HomePage /> } />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
