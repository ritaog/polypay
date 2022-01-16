// import mongoose from 'mongoose'
import VendorProfile from './vendorProfileModel.js'

// const VendorProfileSchema = new mongoose.Schema({
//   vendorName: { type: String, required: true },
//   companyName: { type: String },
//   companyAddress: { type: String },
//   emailAddress: { type: String },
//   password: { type: String },
//   phoneNo: { type: Number },
//   instagramBusinessId: { type: String },
//   permanentToken: { type: String },
// })

// const VendorProfile = mongoose.model("VendorProfile", VendorProfileSchema)

async function findUserByEmail(email) {
  let profile = await VendorProfile.findOne({ emailAddress: email })
  return profile
}

async function findById(id) {
  let user = await VendorProfile.findById(id)
  return user
}

async function findUserAndUpdate(id, userData) {
  let updatedUser = await VendorProfile.findByIdAndUpdate(id, userData)
  return updatedUser
  
}

export default {
  findUserByEmail,
  findById,
  findUserAndUpdate,
}