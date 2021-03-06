// import axios from 'axios'
import './DisplayItem.css'
import SaleListGuest from './ui/SaleListGuest'
import SaleListUser from './ui/SaleListUser'
// import { useState, useEffect } from 'react'

// const DisplayItems = ({userData, profileId}) => {
//   const [saleItems, setSaleItems] = useState([])

  // this use effect will run if a profile id is passed in through the url
  // useEffect(() => {
  //   const getSaleItemsByProfileId = async () => {
  //       const response = await axios.get('/saleItem/listSaleItemsById/' + profileId)
  //     setSaleItems(response.data)
  //   }
  //   if (profileId) {
  //     getSaleItemsByProfileId()
  //   }
  // }, [profileId])

  // this use effect will run if no id is passed in and will display the logged in users sale items
  // useEffect(() => {
  //   const getSaleItemsByLoggedUser = async () => {
  //     const response = await axios.get('/saleItem/listSaleItemsByLoggedUser')
  //     setSaleItems(response.data)
  //   }
  //   if (!profileId) {
  //     getSaleItemsByLoggedUser()
  //   }
  // }, [])

  // const returnedItems = saleItems.map((item) => {
  //   return (
  //     <div key={item._id}>
  //       <p>{item.description}</p>
  //       <h3>{item.price}</h3>
  //       <img src={item.photos[0]} alt={item.vendorName}></img>
  //     </div>
  //   )
  // })

const DisplayItems = ({profileId}) => {
  return (
    <div>
    
        <SaleListGuest profileId={profileId} />
       
   
    </div>
  )
}

export default DisplayItems
