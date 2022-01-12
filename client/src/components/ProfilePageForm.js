import React from 'react'
import "./ProfilePageForm.css"

const ProfilePageForm = () => {
    return (
    <div>
            This is ProfilePageForm
            
        <div className="profile-page-form">
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name.."/>

                <label htmlFor="cname">Company Name </label>
                <input type="text" id="cname" name="companyname" placeholder="Company name.."/>

                <label htmlFor="caddress">Company Address </label>
                <input type="text" id="caddress" name="companyaddress" placeholder="Company address.."/>

                <label htmlFor="email">Email Address </label>
                <input type="text" id="email" name="emailaddress" placeholder="Email address.."/>

                <label htmlFor="phoneno">Phone No </label>
                <input type="number" id="pnumber" name="phonenumber" placeholder="Phone Number.."/>
            
                <input type="submit" value="Submit"/>
            </form>
        </div>
    </div>
    )
}

export default ProfilePageForm

