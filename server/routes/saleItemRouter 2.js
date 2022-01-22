import express from 'express'
import fetch from 'node-fetch'
import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'
import SaleItem from '../models/saleItemModel.js'

const router = express.Router()


// Receives the saleItem object and the file to be uploaded to cloudinary, returns saleItem object with image url
router.post('/upload', upload.single('image'), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path)
  const saleItem = JSON.parse(req.body.formData)
  saleItem.photos[0] = result.secure_url
  const newData = await new SaleItem(saleItem)
  const newItem = await newData.save()
  console.log(newItem)
  res.json(newItem)
})

router.post('/schedule', async (req, res) => {
  let postItem = req.body
  console.log(postItem)

  let currentTime = new Date()
  let scheduleTime = new Date(postItem.postTime)

  console.log("current time", currentTime.getTime())
  console.log("schedule  time", scheduleTime.getTime())

  const delayTime = scheduleTime.getTime() - currentTime.getTime()

  console.log("delay time",delayTime)

  const postSaleItem = async () => {
    const urlSplice = postItem.photos[0].split('').splice(50).join('')
    const resContainer = await fetch(`https://graph.facebook.com/v12.0/${postItem.instagramBusinessId}/media?fields=status_code&image_url=https://res.cloudinary.com/ddcynhc98/image/upload/ar_4:5,c_scale,w_1080/${urlSplice}&caption=${postItem.description}&access_token=${postItem.permanentToken}`, {
      method: "post",
      headers: { "Content-Type": "application/json" }
    })
    const resContainerText = await resContainer.json()
    const resPost = await fetch(`https://graph.facebook.com/v12.0/${postItem.instagramBusinessId}/media_publish?creation_id=${resContainerText.id}&access_token=${postItem.permanentToken}`, {
      method: "post",
      headers: { "Content-Type": "application/json" }
    })
    const resPostText = await resPost.json()
    res.send(resPostText)
  }

  if (delayTime > 0) {
    setTimeout(postSaleItem, delayTime)
  }
  else {
    postSaleItem()
  }
})





export default router