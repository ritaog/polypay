import express from "express";
import { findUserAndUpdate } from "../models/controller.js";
import User from "../models/userModel.js"
import cloudinary from '../utils/cloudinary.js'
import upload from '../utils/multer.js'

const router = express.Router();

// const mustBeLoggedIn = async (req, res, next) => {
//   if (req.user) {
//     next()
//     return
//   }
//   res.sendStatus(401)
// }
 
//GET endpoint || description: http://localhost:5000/api/welcome
router.get("/welcome", (_, res) => {
  res.send("Hello World!!!!");
});

// POST endpoint || description: takes data from userForm and sends to DB
router.post("/addUser", upload.single('image'), async (req, res) => {
  // receives new profile data from front end
  let incomingData = JSON.parse(req.body.formData);
  const result = await cloudinary.uploader.upload(req.file.path)
  // adds received data to User constructor
  let newProfile = await new User(incomingData);
  newProfile.photos[0] = result.secure_url
  // saves new user data to users collection database
  let newId = await newProfile.save()
  console.log(newId);
  

  // sends id back to front end
  res.json(newId);
});

// PUT endpoint || description: http://localhost:5000/user/updateUser
router.put("/updateUser", async (req,res) => {
  let updateUserData = req.body
  const response = findUserAndUpdate(updateUserData._id, updateUserData)
  res.send(response)
})




export default router;
