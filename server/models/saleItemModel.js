import mongoose from "mongoose"

const SaleItemSchema = new mongoose.Schema({
  vendorName: {type: String, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true},
  photos: [String],
  description: String,
  about: String,
  canShip: Boolean,
  available: Boolean,
  postTime: {type: Date, required: true},
  location: String
})

export default mongoose.model("SaleItem", SaleItemSchema)