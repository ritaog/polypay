import React from 'react'
import './ProfilePageForm.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorEmailAlreadyUsed from './modals/ErrorModals/ErrorEmailAlreadyUsed'
// import { ReactDOM } from 'react'

const ProfilePageForm = () => {
  const [name, setName] = useState()
  const [companyName, setCompanyName] = useState()
  const [companyAddress, setCompanyAddress] = useState()
  const [companyType, setCompanyType] = useState()
  const [emailAddress, setEmailAddress] = useState()
  const [password, setPassword] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [selectedImage, setSelectedImage] = useState(null)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
      disclaimer: '',
      instagramBusinessId: '',
      selectedImage: '',
      permanentToken: '',
      saleItems: [],
      photos: [],
    }

    const imageData = new FormData()
    imageData.append('image', selectedImage)
    imageData.append('formData', JSON.stringify(userProfile))

    console.log(userProfile)
    try {
      const response = await axios.post('user/addUser', imageData)
      console.log(response.statusText)

      if (response.statusText === 'Created') {
        console.log(response.data)
        navigate('/')
      }
    } catch (err) {
      handleOpen()
    }
  }
  return (
    <div className="profile-page-container">
      <ErrorEmailAlreadyUsed open={open} handleClose={handleClose}/>
      <div>
        <div className="h1Title">Let's Create Profile</div>
        <div />
        <div className="profile-page-form">
          <form>
            <label htmlFor="name">Name</label>
            <input
              value={name}
              className="input-form"
              type="text"
              id="name"
              name="name"
              placeholder="Your name.."
              onChange={(event) => onInputUpdate(event, setName)}
            />

            <label htmlFor="cname">Company Name </label>
            <input
              value={companyName}
              className="input-form"
              type="text"
              id="cname"
              name="companyName"
              placeholder="Company name.."
              onChange={(event) => onInputUpdate(event, setCompanyName)}
            />

            <label htmlFor="cAddress">Company Address </label>
            <input
              value={companyAddress}
              className="input-form"
              type="text"
              id="cAddress"
              name="companyAddress"
              placeholder="Company address.."
              onChange={(event) => onInputUpdate(event, setCompanyAddress)}
            />

            <label htmlFor="cType">Company Type:</label>
            <select
              name="companyType"
              value={companyType}
              className="input-form"
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
              className="input-form"
              type="email"
              id="email"
              name="emailAddress"
              placeholder="Email address.."
              onChange={(event) => onInputUpdate(event, setEmailAddress)}
            />

            <label htmlFor="pword">Password </label>
            <input
              value={password}
              className="input-form"
              type="text"
              id="pword"
              name="password"
              placeholder="Password..."
              onChange={(event) => onInputUpdate(event, setPassword)}
            />

            <label htmlFor="pNumber">Phone No </label>
            <input
              value={phoneNo}
              className="input-form"
              type="tel"
              id="pNumber"
              name="phoneNumber"
              placeholder="Phone Number.."
              onChange={(event) => onInputUpdate(event, setPhoneNo)}
            />
            <div>
              {selectedImage && (
                <div>
                  <img
                    alt="not fount"
                    width={'100px'}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button
                    className="input-button"
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </button>
                </div>
              )}

              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0])
                  setSelectedImage(event.target.files[0])
                }}
              />
            </div>

            <input
              type="submit"
              value="Submit"
              className="input-submit"
              onClick={postData}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePageForm
