import express from "express";
// import VendorProfile from "../models/vendorProfileModel.js"


const router = express.Router();

//GET endpoint || description: http://localhost:5000/api/welcome
router.get("/welcome", (_, res) => {
  res.send("Hello World!!!!");
});

// POST endpoint || description: takes data from VendorProfileForm and sends to DB
router.post("/addVendorProfile", async (req, res) => {
  let incomingData = req.body;
  let newProfile = await new VendorProfile(incomingData);
  let newId = await newProfile.save();
  console.log(newId);
  res.json(newId);
});





export default router;
