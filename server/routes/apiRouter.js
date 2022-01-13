import express from "express";
import VendorProfile from "../models/test.js"

// const { addVendor } = require("../models/test")

const router = express.Router();

//GET endpoint || description: http://localhost:5000/api/welcome
router.get("/welcome", (_, res) => {
  res.send("Hello World!!!!");
});


router.post("/add", async (req, res) => {
  let incomingData = req.body;
  let newProfile = await new VendorProfile(incomingData);
  let newId = await newProfile.save();
  console.log(newId);
  res.json(newId);
});



export default router;
