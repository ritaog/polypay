import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/apiRouter.js";
import testRouter from "./routes/testRouter.js";
import connectDb from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config({ path: "./config/config.env" });
app.use(json());
app.use(cors());

// "connect to database"
connectDb()

/////////////////////ROUTES//////////////
//description: http://localhost:5000/api
app.use("/api", apiRouter);

//test router
app.use("/test", testRouter);

//Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
