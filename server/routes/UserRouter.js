import express from "express";
import User from "../models/UserModel.js"


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
  let incomingData = req.body;
  let newProfile = await new User(incomingData);
  let newId = await newProfile.save()
  console.log(newId);
  res.json(newId);
});

//GET endpoint || description: http://localhost:5000/api/welcome
router.get("/getUser", (req, res) => {

  res.send("Hello World!!!!");
});



export default router;
