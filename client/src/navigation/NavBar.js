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

// ;<svg
//   className="w-6 h-6"
//   fill="none"
//   stroke="currentColor"
//   viewBox="0 0 24 24"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth={2}
//     d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
//   />
// </svg>


export default NavBar
