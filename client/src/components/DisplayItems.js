import axios from 'axios'
import {Link} from 'react-router-dom'
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
        <Link to = {`/checkout/${item._id}`}>
        <img src={item.photos[0]} alt={item.vendorName}></img>
        <button>Add to cart</button>
        </Link>
      </div>
 
    )
  })

  return <div>{returnedItems}</div>
}

export default DisplayItems
