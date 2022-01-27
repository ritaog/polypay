import React from 'react'

import './LoginPage.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const LoginPage = ({ getObject, userData }) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // submit handler that sends entered email and password to '/login' endpoint to be authenticated
  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      emailAddress,
      password,
    }

    // data is sent to login endpoint
    const response = await axios.post('auth/login', user)

    // response from authentication endpoint (userdata if corrrect email/password) is assigned to the users state function on 'app.js'
    getObject(response.data)

    // navigates to home page
    navigate('/')
  }

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">PolyPay Sign In</div>
        <div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Email </label>
                <input
                  value={emailAddress}
                  type="text"
                  name="uname"
                  required
                  onChange={(e) => {
                    setEmailAddress(e.target.value)
                  }}
                />
              </div>
              <div className="input-container">
                <label>Password </label>
                <input
                  value={password}
                  type="password"
                  name="pass"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <div className="button-container">
                <input type="submit" />
              </div>
              <div>
                <Link to={'/profile'}>Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
