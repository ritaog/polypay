// import axios from 'axios'
// import { Link } from 'react-router-dom'
import './DisplayItem.css'
// import { useState, useEffect } from 'react'
import SaleListUser from './ui/SaleListUser'
import SaleListGuest from './ui/SaleListGuest'

const DisplayItems = ({ userData, profileId }) => {
  console.log('userData', userData);
  console.log('profileId', profileId);
  return (
    <div>
      {profileId ? (
        <SaleListUser userData={userData} />
        ) : (
        <SaleListGuest profileId={profileId} />
      )}
    </div>
  )
}

export default DisplayItems
