import mongoose from 'mongoose'

const TestSchema = new mongoose.Schema({
    userName: { type: String },
    companyName: { type: String },
    productName: { type: String }
})

export default mongoose.model('Test', TestSchema)
