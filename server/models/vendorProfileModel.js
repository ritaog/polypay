import mongoose from "mongoose";


const VendorProfileSchema = new mongoose.Schema({
    vendorName:{type:String, required:true},
    companyName:{type:String},
    companyAddress:{type:String},
    emailAddress:{type:String},
    password:{type:String},
    phoneNo:{type:Number}
})

const VendorProfile = mongoose.model("VendorProfile", VendorProfileSchema)

async function findUserByEmail(email) {
    let profile = await VendorProfile.findOne({ email })
    return profile
}

async function findById(id) {
    let user = await VendorProfile.findById(id)
    return user
}

export default {
    findUserByEmail,
    findById,
}