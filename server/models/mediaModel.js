import mongoose from 'mongoose'

// Media Schema

const MediaSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  vendorId: String,
  uploadTime: { type: Date, required: true },
  photos: [String],
  postedTo: [String],
})

export default mongoose.model('Media', MediaSchema)
