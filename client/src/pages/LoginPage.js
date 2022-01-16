import React from 'react'

import './LoginPage.css'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

const LoginPage = ({ getObject }) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const user = {
      emailAddress,
      password,
    }

    const response = await axios.post('auth/login', user)

    // let param = response

    // param = response
    getObject(response.data)

    navigate('/Home')
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
