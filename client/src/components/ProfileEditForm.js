
import { useState } from 'react'
import { useEffect } from 'react'
//import CSS 

const editProfilePage = ({existingValues, onSave}) => {
    
  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  
    
  useEffect(() => {
    if (existingValues) {
      setName(existingValues.name)
      setCompanyName(existingValues.companyName)
      setCompanyAddress(existingValues.companyAddress)
      setCompanyType(existingValues.companyType)
      setEmailAddress(existingValues.emailAddress)
      setPassword(existingValues.password)
      setPhoneNo(existingValues.phoneNo)
    }
  }, [existingValues])


  function onInputUpdate(event,setter){
    let newValue = event.target.value
    setter(newValue)
  }
  async function postData(){
    let updatedUserDetails = {
      name, companyName, companyAddress, companyType, emailAddresss, password, phoneNo
    }
    await onSave(updatedUserDetails)
  }

 return(
  <div>
   <h2>User Edit Form </h2>
   <label> Name </label>
   <input value = {name} onChange = {(event) => onInputUpdate(event,setName )}/>
   <label> Company Name </label>
   <input value = {companyName} onChange = {(event) => onInputUpdate(event,setCompanyName )}/>
   <label> Company Address </label>
   <input value = {companyAddress} onChange = {(event) => onInputUpdate(event,setCompanyAddress )}/>
   <label> Company Type </label>
   <input value = {companyType} onChange = {(event) => onInputUpdate(event,setCompanyType )}/>
   <label> Email Address </label>
   <input value = {emailAddress} onChange = {(event) => onInputUpdate(event,setEmailAddress )}/>
   <label> Password </label>
   <input value = {password} onChange = {(event) => onInputUpdate(event,setPassword )}/>
   <label> Phone No </label>
   <input value = {phoneNo} onChange = {(event) => onInputUpdate(event,setPhoneNo)}/>
   <button onClick={postData}>Save Updated User Information</button>
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

export default editProfilePage
