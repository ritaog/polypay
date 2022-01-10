import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./routes/apiRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config({ path: "./config/config.env" });
app.use(json());
app.use(cors());

/////////////////////ROUTES//////////////
//description: http://localhost:5000/api
app.use("/api", apiRouter);

//Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
