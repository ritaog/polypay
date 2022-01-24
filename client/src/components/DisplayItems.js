import axios from 'axios'
import './DisplayItem.css'
import { useState, useEffect } from 'react'

const DisplayItems = ({userData, profileId}) => {
  const [saleItems, setSaleItems] = useState([])
  useEffect(() => {
    const getSaleItemsByProfileId = async () => {
        const response = await axios.get('/saleItem/listSaleItemsById/' + profileId)
      setSaleItems(response.data)
    }
    if (profileId) {
      getSaleItemsByProfileId()
    }
  }, [profileId])

  useEffect(() => {
    const getSaleItemsByLoggedUser = async () => {
      const response = await axios.get('/saleItem/listSaleItemsByLoggedUser')
      setSaleItems(response.data)
    }
    if (!profileId) {
      getSaleItemsByLoggedUser()
    }
  }, [])

  const returnedItems = saleItems.map((item) => {
    return (
      <div key={item._id}>
        <p>{item.description}</p>
        <h3>{item.price}</h3>
        <img src={item.photos[0]} alt={item.vendorName}></img>
      </div>
    )
  })

  return <div>{returnedItems}</div>
}

export default DisplayItems
