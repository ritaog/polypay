import axios from 'axios'
import './DisplayItem.css'
import { useState, useEffect } from 'react'

const DisplayItems = (userData) => {
  const [saleItems, setSaleItems] = useState([])

  useEffect(() => {
    const getSaleItems = async () => {
      const response = await axios.get('/saleItem/listSaleItems')
      //console.log(response.data)
      setSaleItems(response.data)
    }
    getSaleItems()
  }, [])

  const returnedItems = saleItems.map((item) => {
    return (
      <div>
        <p>{item.description}</p>
        <h3>{item.price}</h3>
        <img src={item.photos[0]} alt={item.vendorName}></img>
      </div>
    )
  })

  return <div>{returnedItems}</div>
}

export default DisplayItems
