// create HTTP server

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {UserApp} from "./Apis/UserApi.js";  
import cors from 'cors'
 // import your user routes

// load environment variables
dotenv.config();

const app = express();
app.use(cors({
    origin:['http://localhost:5173','https://user-management-app-gules-theta.vercel.app']
}))

// body parser middleware
app.use(express.json());

// forward request to userApi if path starts with /user-api
app.use("/user-api", UserApp);

// connect to database
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(" DB connected");

    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(` Server running on port ${port}`)
    );
  } catch (err) {
    console.log(" Error in DB connection:", err.message);
  }
}

connectDB();

// error handling middleware
app.use(( err,req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});