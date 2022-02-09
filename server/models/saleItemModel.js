import mongoose from 'mongoose'

// Sale Item Schema

const SaleItemSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  vendorId: String,
  postTitle: String,
  price: { type: mongoose.Types.Decimal128, required: true },
  quantity: { type: Number, required: true },
  photos: [String],
  description: String,
  about: String,
  canShip: Boolean,
  available: String,
  postTime: { type: Date, required: true },
  location: String,
})

export default mongoose.model('SaleItem', SaleItemSchema)
