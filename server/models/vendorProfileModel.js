import mongoose from "mongoose";


const VendorProfileSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  companyName: { type: String },
  companyAddress: { type: String },
  emailAddress: { type: String },
  password: { type: String },
  phoneNo: { type: Number },
  instagramBusinessId: { type: String },
  permanentToken: { type: String },
})

const VendorProfile = mongoose.model("VendorProfile", VendorProfileSchema)

async function findUserByEmail(email) {
    let profile = await VendorProfile.findOne({ "emailAddress": email })
    return profile
}

async function findById(id) {
    let user = await VendorProfile.findById(id)
    return user
}

async function saveUser(user) {
    let newUser = await VendorProfile.save(user)
    return newUser
}

export default {
    findUserByEmail,
    findById,
    saveUser
}