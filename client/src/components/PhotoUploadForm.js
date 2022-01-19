import { useState } from 'react'

const PhotoUpload = () => {
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
      photos: '',
      description: caption,
      about: about,
      canShip: canShip,
      available: false,
      postTime: postTime,
      location: location,
    }
  }

  const uploadImage = async (event) => {
    event.preventDefault()
    const files = true
    const imageData = new FormData()

    imageData.append('image', files[0])

    // fetch request to addImage endpoint. appended data is sent to the endpoint and image url is returned

    let imageUrl = await fetch('/api/addImage', {
      method: 'POST',
      body: imageData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error)
      })

    // organizing the data from the cloudinary response, allows for photos/descriptions to be saved one after another

    console.log(imageUrl)
    console.log(imageUrl.data[0].url)

    // imageUrl.data[0].description = photoDescription

    // let oldPhotoArray = imagesUpload
    // let newPhotoArray = [...oldPhotoArray, imageUrl.data[0]]

    // setPhotos(newPhotoArray)
    // trailPhoto.current.value = ''
  }

  return (
    <div>
      <div>
        <label htmlFor="photos">Upload Photo:</label>
        <input
          id="photos"
          type="file"
          name="image"
          accept="image/*"
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
    </div>
  )
}

export default PhotoUpload
