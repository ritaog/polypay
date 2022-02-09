import { useState, useEffect } from 'react'
import axios from 'axios'
//import CSS

const ProfileEditForm = ({ existingValues }) => {

  const [userName, setUserName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')

  useEffect(() => {
    if (existingValues) {
      setUserName(existingValues.userName)
      setCompanyName(existingValues.companyName)
      setCompanyAddress(existingValues.companyAddress)
      setCompanyType(existingValues.companyType)
      setEmailAddress(existingValues.emailAddress)
      setPassword(existingValues.password)
      setPhoneNo(existingValues.phoneNo)
    }
  }, [existingValues])

  function onInputUpdate(event, setter) {
    let newValue = event.target.value
    setter(newValue)
  }
  async function postData() {
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
    const response = await axios.put('/user/updateUser', updatedUserDetails)
    console.log('response', response);
  }

  return (
    <div>
      <h2>User Edit Form </h2>
      <label> Name </label>
      <input
        value={userName}
        onChange={(event) => onInputUpdate(event, setUserName)}
      />
      <label> Company Name </label>
      <input
        value={companyName}
        onChange={(event) => onInputUpdate(event, setCompanyName)}
      />
      <label> Company Address </label>
      <input
        value={companyAddress}
        onChange={(event) => onInputUpdate(event, setCompanyAddress)}
      />
      <label htmlFor="cType">Company Type:</label>
      <select
        name="companyType"
        id="cType"
        value={existingValues.companyType}
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
      <label> Email Address </label>
      <input
        value={emailAddress}
        onChange={(event) => onInputUpdate(event, setEmailAddress)}
      />
      <label> Password </label>
      <input
        value={password}
        onChange={(event) => onInputUpdate(event, setPassword)}
      />
      <label> Phone No </label>
      <input
        value={phoneNo}
        onChange={(event) => onInputUpdate(event, setPhoneNo)}
      />
      <button onClick={postData}>Save</button>
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

export default ProfileEditForm
