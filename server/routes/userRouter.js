import express from 'express'
import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'
import stripe from 'stripe'
import { findUserAndUpdate } from '../models/controller.js'
import User from '../models/userModel.js'
const router = express.Router()

const stripeConfig = stripe(process.env.STRIPE_PRIVATE_KEY)

// const mustBeLoggedIn = async (req, res, next) => {
//   if (req.user) {
//     next()
//     return
//   }
//   res.sendStatus(401)
// }

//GET endpoint || description: http://localhost:5000/api/welcome
router.get('/welcome', (_, res) => {
  res.send('Hello World!!!!')
})

// POST endpoint || description: takes data from userForm and sends to DB || http://localhost:5000/user/addUser

router.post('/addUser', upload.single('image'), async (req, res) => {
  try {
    // receives new profile data from front end
    let incomingData = JSON.parse(req.body.formData)

    ///Verifying that user does not exist yet, before creating account
    const user = await User.findOne({ emailAddress: incomingData.emailAddress })
    if (user) {
      return res.status(400).send({ error: 'This email already exists' })
    }

    /////////////MY NEW CODE //////////////////////

    const result = await cloudinary.uploader.upload(req.file.path)
    // adds received data to User constructor
    let newProfile = await new User(incomingData)
    newProfile.photos[0] = result.secure_url
    //creating express account in stripe
    const account = await stripeConfig.accounts.create({
      email: newProfile.emailAddress,
      country: 'CA',
      type: 'express',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'individual',
      business_profile: {
        name: newProfile.userName,
        product_description: newProfile.companyType,
      },
    })

    console.log('accountttttttt', account)
    newProfile.stripeAccountId = account.id
    console.log('newProfileeee', newProfile)

    // saves new user data to users collection database
    const profile = await newProfile.save()
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
  }
})

// PUT endpoint || description: http://localhost:5000/user/updateUser
router.put('/updateUser', upload.single('image'), async (req, res) => {
  let incomingData = JSON.parse(req.body.formData)
  let updateUserData
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path)
    updateUserData = { ...incomingData, photos: [result.secure_url] }
  } else {
    updateUserData = incomingData
  }
  console.log('updateUserData', updateUserData)

  const response = findUserAndUpdate(updateUserData._id, updateUserData)
  res.send(response)
})

export default router
