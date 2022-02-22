import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
// import LinkAccountPage from './pages/LinkAccountPage'
import SchedulePostPage from './pages/SchedulePostPage'
import DisplayItemsPage from './pages/DisplayItemsPage'
import MediaLibraryPage from './pages/MediaLibraryPage'
import CheckoutPage from './pages/CheckoutPage'
import LinkFacebookCardModal from './components/modals/SetUpMyStuffModals/LinkFacebookCardModal'
import SalePageHeader from './components/navigation/SalePageHeader'
import MiniDrawer from './components/navigation/MiniDrawer'

const App = () => {
  //user state set by user login
  const [user, setUser] = useState({})
  const [vendorName, setVendorName] = useState()
  //function that sets user: this function is passed to the "/"
  const getObject = (userData) => {
    console.log(userData)
    setUser(userData)
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
      <Routes>
        <Route
          path="/"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<HomePage userData={user} />}
            />
          }
        />
        <Route
          path="/link-accounts"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              // children={<LinkAccountPage userData={user} />} this is original.  I am playing with
              children={<LinkFacebookCardModal userData={user} />}
            />
          }
        />
        <Route
          path="/schedule-post"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<SchedulePostPage userData={user} />}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <MiniDrawer
            style = {{background:"red"}}
              userData={user}
              getUserState={getObject}
              children={<ProfilePage userData={user} />}
            />
          }
        />
        <Route
          path="/portfolio"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<DisplayItemsPage userData={user} />}
            />
          }
        />
        <Route
          path="/media-library"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<MediaLibraryPage userData={user} />}
            />
          }
        />
        <Route
          path="/sales/:id"
          element={
            <SalePageHeader
              vendorName={vendorName}
              children={<DisplayItemsPage setVendorName={setVendorName} />}
            />
          }
        />
        <Route
          path="/checkout/:id"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<CheckoutPage />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
