import './ProfilePageForm.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfileEditForm = ({ existingValues }) => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState()
  const [companyName, setCompanyName] = useState()
  const [companyAddress, setCompanyAddress] = useState()
  const [companyType, setCompanyType] = useState()
  const [emailAddress, setEmailAddress] = useState()
  const [password, setPassword] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [selectedImage, setSelectedImage] = useState()

  useEffect(() => {
    const setExistingValues = () => {
      console.log('existingValues', existingValues)
      setUserName(existingValues.userName)
      setCompanyName(existingValues.companyName)
      setCompanyAddress(existingValues.companyAddress)
      setCompanyType(existingValues.companyType)
      setEmailAddress(existingValues.emailAddress)
      setPassword(existingValues.password)
      setPhoneNo(existingValues.phoneNo)
      setSelectedImage(existingValues.selectedImage)
    }
    if (existingValues) {
      setExistingValues()
    }
  }, [existingValues])

  function onInputUpdate(event, setter) {
    let newValue = event.target.value
    setter(newValue)
  }
  async function postData(e) {
    e.preventDefault()

    let updatedUserDetails = {
      _id: existingValues._id,
      userName,
      companyName,
      companyAddress,
      companyType,
      emailAddress,
      password,
      phoneNo,
    }

    const updatedUser = new FormData()
    updatedUser.append('image', selectedImage)
    updatedUser.append('formData', JSON.stringify(updatedUserDetails))

    const response = await axios.put('/user/updateUser', updatedUser)
    if (response.statusText === 'OK') {
      navigate(0)
    }
    
  }

  return (
    <div>
      <h2>User Edit Form </h2>
      <div className="profile-page-form">
        <form>
          <label htmlFor="name"> Name </label>
          <input
            id="name"
            value={userName}
            className="input-form"
            onChange={(event) => onInputUpdate(event, setUserName)}
          />
          <label htmlFor="cname"> Company Name </label>
          <input
            id="cname"
            value={companyName}
            className="input-form"
            onChange={(event) => onInputUpdate(event, setCompanyName)}
          />
          <label htmlFor="address"> Company Address </label>
          <input
            id="address"
            value={companyAddress}
            className="input-form"
            onChange={(event) => onInputUpdate(event, setCompanyAddress)}
          />
          <label htmlFor="cType">Company Type:</label>
          <select
            name="companyType"
            id="cType"
            value={companyType}
            className="input-form"
            onChange={(event) => onInputUpdate(event, setCompanyType)}
          >
            {/* <option value={existingValues.companyType}>
          {existingValues.companyType}
        </option> */}
            <option value="artisan">artisan</option>
            <option value="independent">independent</option>
            <option value="consignment">consignment</option>
            <option value="vintage">vintage</option>
            <option value="resale">resale</option>
            <option value="other">other</option>
          </select>
          <label htmlFor="email"> Email Address </label>
          <input
            id="email"
            value={emailAddress}
            className="input-form"
            onChange={(event) => onInputUpdate(event, setEmailAddress)}
          />
          <label htmlFor="password"> Password </label>
          <input
            id="password"
            value={password}
            className="input-form"
            onChange={(event) => onInputUpdate(event, setPassword)}
          />
          <label htmlFor="phoneNo"> Phone No </label>
          <input
            id="phoneNo"
            value={phoneNo}
            className="input-form"
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
            onClick={(e) => {
              postData(e)
            }}
          />
        </form>
      </div>
    </div>
  )
}
// )

//  //   {id} = useParams()
//     useEffect(
//         function(){
//             console.log("get record info for " +id)
//         },
//         [id]
//     )
//  // return (
//     <div>
//         Edit record {id}
//       <ProfilePageForm Edit/>
//     </div>
//   )
// // }
// <button onClick={postData}>Save</button>

export default ProfileEditForm
