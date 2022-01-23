import express from "express";
import User from "../models/userModel.js"


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
router.post("/addUser", async (req, res) => {
  // receives new profile data from front end
  let incomingData = req.body;

  // adds received data to User constructor
  let newProfile = await new User(incomingData);

  // saves new user data to users collection database
  let newId = await newProfile.save()
  console.log(newId);
  

  // sends id back to front end
  res.json(newId);
});




export default router;
