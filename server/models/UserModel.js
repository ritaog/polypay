import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true},
  userType: { type: String, required: true},
  companyName: String,
  companyAddress: String,
  companyType: String,
  emailAddress: { type: String, required: true },
  password: { type: String, required: true },
  phoneNo: Number,
  userReview: Number,
  instagramBusinessId: String,
  permanentToken: String,
  saleItems: [String],
})

export default mongoose.model("User", UserSchema)

