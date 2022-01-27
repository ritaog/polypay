import React from 'react';
import LogInButton from '../components/LogInButton';
import UserIcon from './UserIcon'

const NavLinks = ({userData}) => {
  return (
    <div
      className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
      id="mobile-menu-2"
    >
      <ul className="flex flex-col self-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li className="self-center">
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-gray-700 bg-white rounded md:bg-transparent hover:text-black md:p-0 dark:text-white"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li className="self-center">
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            About
          </a>
        </li>
        <li className="self-center">
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Services
          </a>
        </li>
        <li className="self-center">
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Pricing
          </a>
        </li>
        <li className="self-center">
          <a
            href="#"
            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Contact
          </a>
        </li>
        <li>
          {userData ? <UserIcon /> : <LogInButton buttonText="Register Now" />}
          {/* <UserIcon /> */}
        </li>
      </ul>
    </div>
  )
};

export default NavLinks;
