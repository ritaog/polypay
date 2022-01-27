import React from 'react'
import NavLinks from './NavLinks'
import PolyPayLogo from './PolyPayLogo'
import UserIcon from './UserIcon'

const NavBar = ({userData}) => {
  return (
    <nav className="px-2 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 border-b shadow-md">
      <div className="container flex flex-wrap items-center justify-between items-end mx-auto py-3">
        <PolyPayLogo />
        <NavLinks userData={userData}/>
        {/* {userData ? <UserIcon /> : ""} */}
        
      </div>
    </nav>
  )
}


export default NavBar
