import { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'
import { Link } from 'react-router-dom'

const LinkAccountPage = ({ userData }) => {
  const [dataBundle, setDataBundle] = useState()

  const responseFacebook = (response) => {
    let userDataBundle = {
      userData,
      response,
    }
    setDataBundle(userDataBundle)
  }

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
