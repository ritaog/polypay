import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
// import LinkAccountPage from './pages/LinkAccountPage'
import SchedulePostPage from './pages/SchedulePostPage'
import SetUpStripePage from './pages/SetUpStripePage'
import PaymentDashboard from './pages/PaymentDashboard'
import DisplayItemsPage from './pages/DisplayItemsPage'
import StripeSuccess from './pages/StripeSuccess'
import StripeFailure from './pages/StripeFailure'
import StripeSuccessfulCheckout from './pages/StripeSuccessfulCheckout'
import PostDashboardPage from './pages/PostDashboardPage'
import CheckoutPage from './pages/CheckoutPage'
import LinkFacebookCardModal from './components/modals/SetUpMyStuffModals/LinkFacebookCardModal'
import SalePageHeader from './components/navigation/SalePageHeader'
import MiniDrawer from './components/navigation/MiniDrawer'
import AdminPage from './pages/AdminPage'

const App = () => {
  //user state set by user login
  const [user, setUser] = useState()
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
        <Route path="/Admin" element={ <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<AdminPage userData={user} />}
            />}/>
        <Route
          path="/"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<PostDashboardPage userData={user} />}
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
              style={{ background: 'red' }}
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
          path="/post-dashboard"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<PostDashboardPage userData={user} />}
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

        <Route
          path="/setup-stripe"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<SetUpStripePage userData={user} />}
            />
          }
        />

        <Route
          path="/earnings-dashboard"
          element={
            <MiniDrawer
              userData={user}
              getUserState={getObject}
              children={<PaymentDashboard userData={user} />}
            />
          }
        />

        <Route path="/success" element={<StripeSuccess />} />
        <Route path="/failure" element={<StripeFailure />} />
        <Route
          path="/successfulCheckout"
          element={<StripeSuccessfulCheckout userData={user} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
