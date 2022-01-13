import express from "express";

const {addVendor} = require("../models/test")

const router = express.Router();

//GET endpoint || description: http://localhost:5000/api/welcome
router.get("/welcome", (_, res) => {
  res.send("Hello World!!!!");
});


router.post ("/add", async (_, res) => {
  let vendorProfile = req.body
  let newId = await addVendor(vendorProfile)
  res.json(newId)
});



export default router;
