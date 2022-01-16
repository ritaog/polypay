import { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'


const HomePage = ({ userData }) => {
  const [message, setMessage] = useState()
  const [dataBundle, setDataBundle] = useState()

  const responseFacebook = (response) => {
    let userDataBundle = {
      userData,
      response
    }
    setDataBundle(userDataBundle)
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post('auth/validateFb', dataBundle)
      console.log(response)
    }
    if (dataBundle){
      getData()
    }
  }, [dataBundle])

  //grabs data from backend once page is rendered
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('vendor/welcome')
      setMessage(response.data)
    }
    getData()
  }, [])

  return (
    <div>
      <h1>Polypay says: {message}</h1>
      <h1>
        Hello: {JSON.stringify(userData.vendorName)} please connect your
        instagram account through fb.
      </h1>
      <div>
        <FacebookLogin
          appId="2632625433548280"
          autoLoad={true}
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
  )
}

export default HomePage
