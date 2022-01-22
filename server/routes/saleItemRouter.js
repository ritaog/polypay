import express from 'express'
import fetch from 'node-fetch'
import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'
import SaleItem from '../models/saleItemModel.js'
import { findUserAndUpdate } from '../models/controller.js'

const router = express.Router()

// POST endpoint || Receives the saleItem object and the file to be uploaded to cloudinary, returns saleItem object with image url
router.post('/upload', upload.single('image'), async (req, res) => {
  // sends file sent from front end to be uploaded to instagram to cloudinary. uses cloudinary upload config in "../utils/cloudinary.js"
  const result = await cloudinary.uploader.upload(req.file.path)

  // parses received formData from front end and parses to JSON
  const saleItem = JSON.parse(req.body.formData)

  // adds the secure url the is return in 'result' from cloudinary
  saleItem.photos[0] = result.secure_url

  // adds saleItem object (all important information for sale on instagram) to the SaleItem constructor from "../models/saleItemModel"
  const newData = await new SaleItem(saleItem)

  // saves "newData" to the saleItems collection in database
  const newItem = await newData.save()
  console.log(newItem)

  // sends result from database back to front end
  res.json(newItem)
})

// POST endpoint || Schedules a post to instagram from logged in user. required user data and cloudinary link from "/upload" upload endpoint
router.post('/schedule', async (req, res) => {
  // sale item data from front end is received
  let postItem = req.body
  console.log("postItem", postItem)

  // Date() constructor is used to find the current time of the request
  let currentTime = new Date()

  // uses the postTime the was selected by user in front end. adds time to Date() constructor
  let scheduleTime = new Date(postItem.postTime)

  console.log('current time', currentTime.getTime())
  console.log('schedule  time', scheduleTime.getTime())

  // .getTime() used on both scheduleTime and current time converts date received from user in front end and current time into milliseconds
  // times are subtracted to determine the delay time for post
  const delayTime = scheduleTime.getTime() - currentTime.getTime()

  console.log('delay time', delayTime)

  // function that is called after specified delay determined on line 49, delay statement is on line 69
  const postSaleItem = async () => {
    // incoming cloudinary url is spliced at specifice spot. this is because first part of url is always the same and aspect ratio and width
    // must be added manually => (ar_4:5,c_scale,w_1080). this is because instagram requires a specific ar and width.
    const urlSplice = postItem.photos[0].split('').splice(50).join('')

    // first api call uploads image from cloudinary. data required, instagram business id, spliced url, caption from user, and permanent token.
    // api returns an ID for a media container. post is in instagram DB but will not be displayed until media container ID is sent in new api call
    const resContainer = await fetch(
      `https://graph.facebook.com/v12.0/${postItem.instagramBusinessId}/media?fields=status_code&image_url=https://res.cloudinary.com/ddcynhc98/image/upload/ar_4:5,c_scale,w_1080/${urlSplice}&caption=${postItem.description}&access_token=${postItem.permanentToken}`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    // converts response from api call to create container to json
    const resContainerText = await resContainer.json()

    // second api call sends media container ID back to instagram. data required, instagram business ID, media container ID, and permanent token
    // item will now be displayed on instagram as post
    const resPost = await fetch(
      `https://graph.facebook.com/v12.0/${postItem.instagramBusinessId}/media_publish?creation_id=${resContainerText.id}&access_token=${postItem.permanentToken}`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    // converts response from second api call to json
    const resPostText = await resPost.json()

    // new array spread to add new sale item id to user saleItems array
    let updatedSaleItems = {
      saleItems: [...postItem.saleItems, postItem._id]
    }

    // function from "../models/controller.js" finds user by id and updates sale items array with new array created on line 86
    await findUserAndUpdate(postItem.vendorId, updatedSaleItems)
    
    // sends instagram response back to front end
    res.send(resPostText)
  }

  // delay statement that calls postSaleItem after determined delay time. if delay time is less than 0 it is posted immediately
  if (delayTime > 0) {
    // timeout function for delay
    setTimeout(postSaleItem, delayTime)
  } else {
    postSaleItem()
  }
})

//GET endpoint || description: localhost:5000/SaleItem/listSaleItems
router.get('/listSaleItems', async (req, res) => {
  const user = req.user
  console.log('This is the user', user)
  const response = await SaleItem.find({ vendorId: user._id })
  res.json(response)
})

export default router