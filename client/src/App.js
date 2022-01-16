import React from 'react'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {

  const [ user, setUser ] = useState()
   const getObject = (userObj) => {
    console.log(userObj)
    setUser(userObj)
  }
  // const [ user, setUser ] = useState()

  // useEffect(() => {
  //   const getUser = async () => {
  //     setUser()
  //   }
  //   if (!user) {
  //     getUser()
  //   }
    
  // }, [user])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LoginPage getObject={getObject}/>} />
        <Route path="/Home" element={<HomePage userData={user} /> } />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
