import mongoose from 'mongoose'

// Media Schema

const SaleDataSchema = new mongoose.Schema({
  saleItemTitle: String,
  saleItemId: String,
  vendorId: String,
  saleTotal: mongoose.Types.Decimal128,
  saleDate: Date,
  fulfilled: String,
  quantity: Number,
  /*
  session_id: String,
  total_amount: mongoose.Types.Decimal128,
  customer_email: String,
  customer_name: String,
  customer_address: mongoose.Mixed,

  data_on_item_sold: mongoose.Mixed,

  shipping_amount: Number,
  saleDate: Date,
  status: String, */
})

export default mongoose.model('SaleData', SaleDataSchema)
