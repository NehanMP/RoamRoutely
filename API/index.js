import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
// add the extension a end cuz this is backend
import authRoute from "./routes/userauthRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Listning to server on port 3000...");
});

// apis
app.use("/API/user", userRoute);
// the address to make the ai work
// remember backend has the port of 3000. and this api route is in home page
app.use("/API/auth", authRoute);

// the middleware to handle errors rising between apis
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  // shortcircuit operator.gets truthy values first.500 is the internal server error status code.(universal server eeroor statuscode
  const message = err.message || "Internal server Error";

  return res.status(statuscode).json({
    success: false,
    message,
    statuscode,
  });
});
