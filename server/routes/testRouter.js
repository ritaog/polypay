import express from "express"
import Test from "../models/test.js"

const router = express.Router();

//GET endpoint || description: http://localhost:5000/test for db/
router.post ("/add", async (_, res) => {
    const testObjects = {
    userName: "Andrea",
    companyName: "PolyTest",
    productName: "none"
    }

const test = await new Test(testObjects)
await test.save()
res.json("success")
});

export default router;
