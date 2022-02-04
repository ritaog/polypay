import React from 'react'
import ProfilePageForm from '../components/ProfilePageForm'
import ProfileEditForm from '../components/ProfileEditForm'
const ProfilePage = ({userData}) => {
  return (
    <div>
      {userData ? <ProfileEditForm existingValues={userData}/> : <ProfilePageForm/>}
    </div>
  )
}

export default ProfilePage
