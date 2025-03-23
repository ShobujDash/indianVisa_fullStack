const express = require("express");

const app = new express();
const dotenv = require("dotenv").config();

// Security Middleware lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Database Lib Import
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const userRouter = require("./routes/AuthRoute");
const visaRoutes = require("./routes/VisaRoutes");
connectDB();

// Security Middleware Implement
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FROTEND_URL_PRODUCTION, // আপনার ফ্রন্টএন্ড URL
    credentials: true, // Cookie Enable করার জন্য
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:3000", // আপনার ফ্রন্টএন্ড URL
//     credentials: true, // Cookie Enable করার জন্য
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Routing Implement
app.use("/api/user", userRouter);
app.use("/api/applicants", visaRoutes);

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});

// error handeling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App Run @${PORT}`);
});

