import axios from "axios";

// Load baseURL from environment variables
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // Cookie পাঠানোর জন্য
// });
const axiosInstance = axios.create({
  baseURL: "https://indianvisa-fullstack.onrender.com/api",
  withCredentials: true, // Cookie পাঠানোর জন্য
});



export default axiosInstance;
