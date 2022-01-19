import React from 'react'
import './ProfilePageForm.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfilePageForm = () => {
  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const navigate = useNavigate()

  const onInputUpdate = (event, setter) => {
    let newValue = event.target.value
    setter(newValue)
  }

  const postData = async (event) => {
    event.preventDefault()
    let userProfile = {
      userName: name,
      userType: 'vendor',
      companyName: companyName,
      companyAddress: companyAddress,
      companyType: companyType,
      emailAddress: emailAddress,
      password: password,
      phoneNo: phoneNo,
      userReview: 5,
      instagramBusinessId: '',
      permanentToken: '',
      saleItems: [],
    }
    console.log(userProfile)
    const response = await axios.post('vendor/addUser', userProfile)
    console.log(response.statusText)
    if (response.statusText === 'OK') {
      navigate('/')
    }
  }
  return (
    <div>
      This is ProfilePageForm
      <div className="profile-page-form">
        <form>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            onChange={(event) => onInputUpdate(event, setName)}
          />

          <label htmlFor="cname">Company Name </label>
          <input
            value={companyName}
            type="text"
            id="cname"
            name="companyName"
            placeholder="Company name.."
            onChange={(event) => onInputUpdate(event, setCompanyName)}
          />

          <label htmlFor="cAddress">Company Address </label>
          <input
            value={companyAddress}
            type="text"
            id="cAddress"
            name="companyAddress"
            placeholder="Company address.."
            onChange={(event) => onInputUpdate(event, setCompanyAddress)}
          />

          <label htmlFor="cType">Company Type:</label>
          <select
            name="companyType"
            id="cType"
            onChange={(event) => onInputUpdate(event, setCompanyType)}
          >
            <option value="">--Please choose an option--</option>
            <option value="artisan">Artisan</option>
            <option value="independent">Independent</option>
            <option value="consignment">consignment</option>
            <option value="vintage">Vintage</option>
            <option value="resale">Resale</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="email">Email Address </label>
          <input
            value={emailAddress}
            type="email"
            id="email"
            name="emailAddress"
            placeholder="Email address.."
            onChange={(event) => onInputUpdate(event, setEmailAddress)}
          />

          <label htmlFor="pword">Password </label>
          <input
            value={password}
            type="text"
            id="pword"
            name="password"
            placeholder="Password..."
            onChange={(event) => onInputUpdate(event, setPassword)}
          />

          <label htmlFor="pNumber">Phone No </label>
          <input
            value={phoneNo}
            type="tel"
            id="pNumber"
            name="phoneNumber"
            placeholder="Phone Number.."
            onChange={(event) => onInputUpdate(event, setPhoneNo)}
          />

          <input type="submit" value="Submit" onClick={postData} />
        </form>
      </div>
    </div>
  )
}

export default ProfilePageForm
