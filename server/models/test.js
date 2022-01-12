import mongoose from "mongoose";


const testSchema = new mongoose.Schema({
    userName: {type:String},
    companyName: {type:String},
    productName: {type:String}
})

export default mongoose.model("Test", testSchema);