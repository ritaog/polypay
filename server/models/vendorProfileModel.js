import mongoose from "mongoose";


const VendorProfileSchema = new mongoose.Schema({
    vendorName:{type:String, required:true},
    companyName:{type:String},
    companyAddress:{type:String},
    emailAddress:{type:String},
    phoneNo:{type:Number}
})

export default mongoose.model("VendorProfile", VendorProfileSchema);
