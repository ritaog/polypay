import React from 'react'
import "./ProfilePageForm.css"

const ProfilePageForm = () => {
    return (
    <div>
            This is ProfilePageForm
            
        <div>
    <form>
    <label htmlfor="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Your name.."/>

    <label htmlfor="cname">Company Name </label>
    <input type="text" id="cname" name="companyname" placeholder="Company name.."/>

    <label htmlfor="caddress">Company Address </label>
    <input type="text" id="caddress" name="companyaddress" placeholder="Company address.."/>

    <label htmlfor="email">Email Address </label>
    <input type="text" id="email" name="emailaddress" placeholder="Email address.."/>

    <label htmlfor="phoneno">Phone No </label>
    <input type="number" id="pnumber" name="phonenumber" placeholder="Phone Number.."/>
  
    <input type="submit" value="Submit"/>
  </form>
</div>
        </div>
    )
}

export default ProfilePageForm

