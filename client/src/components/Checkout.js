import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const Checkout = () => {
    const params=useParams()
    const [saleItem, setSaleItem] = useState({})
    useEffect(() => {
        const getData = async()=> {
            const response = await axios.get(`/saleItem/getSaleItemById/${params.id}`) 
            setSaleItem(response.data)
            console.log("response.data", response.data)
        } 
        getData()
    }, [])
    return (
        <div>
            {JSON.stringify(saleItem)}
        
            This is the checkout


        <p>{saleItem.description}</p>
        <img src={saleItem.photos[0]} alt={saleItem.vendorName}></img>
        <p>{saleItem.vendorName}</p>
        <p>Price{saleItem.price}</p>
        <p>Quantity Available{saleItem.quantity}</p>
        <p>Location{saleItem.location}</p>
        <p>Can this item be shipped{saleItem.canShip}</p>
        <p>{saleItem.about}</p>
        <button>Buy now</button>
    

        </div>
    )
}

export default Checkout
