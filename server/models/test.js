import mongoose from "mongoose";


const vendorProfile = mongoose.model("vendorProfile",{
    vendorName:{type:String},
    companyName:{type:String},
    companyAddress:{type:String},
    emailAddress:{type:String},
    phoneNo:{type:String},
})
async function addVendor(profileData) {
    let newProfile = new vendorProfile(profileData)
    let createdProfile = await newProfile.save()
    return createdProfile.id
}
module.exports = {addVendor}