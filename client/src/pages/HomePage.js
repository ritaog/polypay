import { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'

const HomePage = ({ userData }) => {
  const [message, setMessage] = useState()
  const [accessToken, setAccessToken] = useState()
  const [fbPageId, setFbPageId] = useState()
  const [instaBuisnessId, setInstaBuisnessId] = useState()
  // const componentClicked = (data) => {
  //   console.log('data', data)
  // }

  const responseFacebook = (response) => {
    console.log('fb response', response)
    setAccessToken(response.accessToken)
  }

  //grabs data from backend once page is rendered
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('vendor/welcome')
      setMessage(response.data)
    }
    getData()
  }, [])

  //sends the access token to fb and returns the fb account ID
  useEffect(() => {
    let getFbId = async () => {
      let response = await fetch(
        `https://graph.facebook.com/v12.0/me/accounts?access_token=${accessToken}`
      )
      let responseJson = await response.json()
      console.log('user page id:', responseJson)
      return setFbPageId(responseJson.data[0].id)
    }
    if (accessToken) {
      getFbId()
    }
  }, [accessToken])

  // sends fb account Id and access token a has the linked instagram account page Id returned
  useEffect(() => {
    let getInstaBuisnessId = async () => {
      let response = await fetch(
        `https://graph.facebook.com/v12.0/${fbPageId}?fields=instagram_business_account&access_token=${accessToken}`
      )
      let responseJson = await response.json()
      console.log('insta buisness page id:', responseJson)
      return setInstaBuisnessId(responseJson.instagram_business_account.id)
    }
    if (fbPageId) {
      getInstaBuisnessId()
    }
  }, [accessToken, fbPageId])

  //         useEffect(() => {
  //           let getInstaBuisnessId = async () => {
  //             let response = await fetch(
  //               `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${client-id}&client_secret=${client-secret}&fb_exchange_token=${exchange-token}
  // `
  //             )
  //             let responseJson = await response.json()
  //             console.log('insta buisness page id:', responseJson)
  //             return setInstaBuisnessId(
  //               responseJson.instagram_business_account.id
  //             )
  //           }
  //           if (fbPageId) {
  //             getInstaBuisnessId()
  //           }
  //         }, [accessToken, fbPageId])

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
