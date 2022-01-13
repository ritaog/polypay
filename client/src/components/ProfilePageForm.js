import React from 'react'
import "./ProfilePageForm.css"
import { useState } from 'react'


const ProfilePageForm = () => {
    const [name, setName] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [companyAddress, setCompanyAddress] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [phoneNo, setPhoneNo] = useState("")

    const onInputUpdate = (event,setter) => {
        let newValue = event.target.value 
        setter(newValue)
    }

    const postData = async (event) => {
        event.preventDefault()
        let vendorProfile = {
            vendorName:name,
            companyName:companyName,
            companyAddress:companyAddress,
            emailAddress:emailAddress,
            phoneNo:phoneNo

    } 

    const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        body: JSON.stringify(vendorProfile),
        headers: {
            "Content-Type": "application/json",
        },
    });
    let newId = await response.json()
    console.log(newId)
    }
    return (
        <div>
            This is ProfilePageForm
            
        <div className="profile-page-form">
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name.." onChange={(event)=>onInputUpdate(event,setName)}/>

                <label htmlFor="cname">Company Name </label>
                <input type="text" id="cname" name="companyname" placeholder="Company name.."onChange={(event)=>onInputUpdate(event,setCompanyName)}/>

                <label htmlFor="caddress">Company Address </label>
                <input type="text" id="caddress" name="companyaddress" placeholder="Company address.."onChange={(event)=>onInputUpdate(event,setCompanyAddress)}/>

                <label htmlFor="email">Email Address </label>
                <input type="text" id="email" name="emailaddress" placeholder="Email address.."onChange={(event)=>onInputUpdate(event,setEmailAddress)}/>

                <label htmlFor="phoneno">Phone No </label>
                <input type="number" id="pnumber" name="phonenumber" placeholder="Phone Number.."onChange={(event)=>onInputUpdate(event,setPhoneNo)}/>
            
                <input type="submit" value="Submit"onClick={postData}/>
            </form>
        </div>
    </div>
    )
}

export default ProfilePageForm

