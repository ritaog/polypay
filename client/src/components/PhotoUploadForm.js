import { useState } from 'react'
import axios from 'axios'
const PhotoUpload = () => {
  
  
  const [ uploadPhoto, setUploadPhoto ] = useState()
  const [photos, setPhotos] = useState([])
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [caption, setCaption] = useState('')
  const [about, setAbout] = useState('')
  const [canShip, setCanShip] = useState(false)
  const [location, setLocation] = useState('')
  const [postTime, setPostTime] = useState('')

  const onInputUpdate = (event, setter) => {
    let newValue = event.target.value
    setter(newValue)
  }

  const onCheckBox = (event, setter) => {
    let newValue = event.target.checked
    setter(newValue)
  }

  const capturePostData = async (event) => {
    event.preventDefault()

    const postData = {
      vendorName: '',
      price: price,
      quantity: quantity,
      photos: photos,
      description: caption,
      about: about,
      canShip: canShip,
      available: false,
      postTime: postTime,
      location: location,
    }

    // const response = await axios.post('/', postData)
    console.log(postData)
  }

  const uploadImage = async (event) => {
    event.preventDefault()
    console.log(uploadPhoto)
    const imageData = new FormData()

    imageData.append('image', uploadPhoto)
    console.log(imageData)

    let response = await axios.post('/upload/uploadImage', imageData)
    setPhotos([response.data.secure_url])
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
          <button onClick={uploadImage}>Upload Image</button>
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

        <input type="submit" value="Submit" onClick={capturePostData} />
      </form>
    </div>
  )
}

export default PhotoUpload
