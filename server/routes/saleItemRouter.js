import express from 'express'
import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'
import SaleItem from '../models/saleItemModel.js'

const router = express.Router()

router.post('/upload', upload.single('image'), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path)
  const saleItem = JSON.parse(req.body.formData)
  saleItem.photos[0] = result.secure_url
  const newData = await new SaleItem(saleItem)
  const newItem = await newData.save()
  console.log(newItem)
  res.json(newItem)
})





export default router