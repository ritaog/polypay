import { useState } from 'react'
import axios from 'axios'
const PhotoUpload = ({userData}) => {



  const [uploadPhoto, setUploadPhoto] = useState([])
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [caption, setCaption] = useState('')
  const [about, setAbout] = useState('')
  const [canShip, setCanShip] = useState(false)
  const [location, setLocation] = useState('')
  const [postTime, setPostTime] = useState('')

  const postData = {
    vendorName: userData.userName,
    vendorId: userData._id,
    price: price,
    quantity: quantity,
    photos: [],
    description: caption,
    about: about,
    canShip: canShip,
    available: false,
    postTime: postTime,
    location: location,
  }

  // function that passes setter and input events to specific states, saves writing for each input on form
  const onInputUpdate = (event, setter) => {
    let newValue = event.target.value
    setter(newValue)
  }

  // similar to onInputUpdate but slightly different to work with the check box
  const onCheckBox = (event, setter) => {
    let newValue = event.target.checked
    setter(newValue)
  }

  // handles the submitting of all data collected from form states. then sends data to backend for uploading to cloudinary and instagram
  const submitHandler = async (event) => {
    event.preventDefault()

    // assigns a new form data constructor to append data to to send to back end. 'image' is file selected by user to be uploaded to instagram
    // "formData" is all the data collected from the schedule post form to be sent to back end 
    const imageData = new FormData()
    imageData.append('image', uploadPhoto)
    imageData.append('formData', JSON.stringify(postData))

    // first post sends photo file and form data to back end. response is the compiled sale item object with image url from cloudinary
    const responseUpload = await axios.post('/saleItem/upload', imageData)

    console.log(responseUpload)
    
    // shortcut to combine the response from first post and user data from user state to be sent to back end as one object
    const {instagramBusinessId, permanentToken, saleItems} = userData

    const saleItemDataBundle = {
      ...responseUpload.data, instagramBusinessId, permanentToken, saleItems
    }

    console.log("saleItemDataBundle",saleItemDataBundle)

    // second post sends combine object from above to back end to be posted to instagram and added to the users sale que
    const responseSchedule = await axios.post('/saleItem/schedule', saleItemDataBundle)

    console.log(responseSchedule)
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="photos">Upload Photo:</label>
          <input
            id="photos"
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => setUploadPhoto(event.target.files[0])}
            multiple={false}
          />
        </div>

        <div>
          <label htmlFor="price">Item Price:</label>
          <input
            id="price"
            type="number"
            name="itemPrice"
            min="1"
            onChange={(event) => onInputUpdate(event, setPrice)}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            min="1"
            onChange={(event) => onInputUpdate(event, setQuantity)}
          />
        </div>
        <div>
          <label htmlFor="description">Write your instagram caption:</label>
          <input
            id="description"
            name="itemDescription"
            type="text"
            maxLength="2200"
            placeholder={'Add Instagram caption...'}
            onChange={(event) => onInputUpdate(event, setCaption)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="about">About your item:</label>
          </div>
          <textarea
            id="about"
            placeholder="About your item..."
            name="aboutItem"
            cols="100"
            rows="10"
            onChange={(event) => onInputUpdate(event, setAbout)}
          />
        </div>
        <div>
          <label htmlFor="canShip">Can this item be shipped?</label>
          <div>
            <input
              id="canShip"
              type="checkbox"
              name="canBeShipped"
              // value={canShip}

              onChange={(event) => onCheckBox(event, setCanShip)}
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="location">Select a location:</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Select a location..."
            onChange={(event) => onInputUpdate(event, setLocation)}
          />
        </div>

        <div>
          <label htmlFor="postTime">
            When would you like this to be posted to instagram?
          </label>
          <input
            id="postTime"
            type="datetime-local"
            name="schedulePost"
            onChange={(event) => onInputUpdate(event, setPostTime)}
          />
        </div>

        <input type="submit" value="Submit" onClick={submitHandler} />
      </form>
    </div>
  )
}

export default PhotoUpload
