import mongoose from 'mongoose'

// Media Schema

const SaleDataSchema = new mongoose.Schema({
  saleItemTitle: String,
  saleItemId: String,
  vendorId: String,
  saleTotal: mongoose.Types.Decimal128,
  saleDate: Date,
  fulfilled: String,
  quantity: Number
})

export default mongoose.model('SaleData', SaleDataSchema)
