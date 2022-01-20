import express from 'express'
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
  let currentTime = new Date()
  let scheduleTime = new Date(postItem.postTime)

  console.log("current time", currentTime.getTime())
  console.log("schedule  time", scheduleTime.getTime())

  const delayTime = scheduleTime.getTime() - currentTime.getTime()

  console.log("delay time",delayTime)

  const postSaleItem = async () => {
    res.send('item has been posted')
  }

  if (delayTime > 0) {
    setTimeout(postSaleItem, delayTime)
  }
  else {
    postSaleItem()
  }
})





export default router