import { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'
import { Link } from 'react-router-dom'

const LinkAccountPage = ({ userData }) => {
  const [dataBundle, setDataBundle] = useState()

  // from "react-facebook-login" once user has clicked button to link facebook account. returns response from facebook with
  // temporary access token. this is used to generate permanent access to users instagram account
  const responseFacebook = (response) => {
    // bundles together data from response from facebook above and userData from the users state passed down from 'app.js'
    let userDataBundle = {
      userData,
      response,
    }
    setDataBundle(userDataBundle)
  }

  // once data bundle has been saved. data is sent to the "/validateFb" endpoint in back end to generate instagram business id and permanent access token
  useEffect(() => {
    const getData = async () => {
      const response = await axios.post('auth/validateFb', dataBundle)
      console.log(response)
    }
    if (dataBundle) {
      getData()
    }
  }, [dataBundle])

  return (
    <div>
      <h1>
        {userData
          ? JSON.stringify(userData.userName)
          : 'log in to link accounts:'}{' '}
        please connect your instagram account through fb.
      </h1>
      <div>
        <div>
          <Link to={'/'}>Log in page</Link>
        </div>
        <br/>
        <div>
          <FacebookLogin
            appId="2632625433548280"
            autoLoad={false}
            fields="name,email,picture"
            scope="
          public_profile, 
          instagram_basic, 
          pages_show_list,
          pages_read_engagement, 
          ads_management, 
          business_management, 
          instagram_content_publish, 
          pages_read_engagement,
          instagram_manage_comments
          "
            // onClick={componentClicked}
            callback={responseFacebook}
          />
        </div>
      </div>
    </div>
  )
}

export default LinkAccountPage
