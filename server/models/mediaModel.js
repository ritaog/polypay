import mongoose from 'mongoose'

// Sale Item Schema

const MediaSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  vendorId: String,
  uploadTime: { type: Date, required: true },
  photos: [String]
})

export default mongoose.model('media', MediaSchema)
