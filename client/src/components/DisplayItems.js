// import axios from 'axios'
// import { Link } from 'react-router-dom'
import './DisplayItem.css'
// import { useState, useEffect } from 'react'
import TitlebarImageList from './ui/TitleBarImageList'

const DisplayItems = ({ userData, profileId }) => {
 

  return (
    <div>
      <TitlebarImageList userData={userData} profileId={profileId}/>

    </div>
  )
}

export default DisplayItems
