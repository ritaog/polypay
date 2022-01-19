import express from 'express'
import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'


const router = express.Router()

router.post('/uploadImage', upload.single('image'), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path)
  res.json(result)
})


export default router