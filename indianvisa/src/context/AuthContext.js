"use client"; // Required for Next.js App Router

import axiosInstance from "@/lib/axiosInstance";
import { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Create Context
const AuthContext = createContext();

// 2️⃣ Create Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedin] = useState(false);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/user/profile");
        if (data?.success) {
          setUser(data?.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]);

  const logout = async () => {
    try {
      const { data } = await axiosInstance.get("/user/logout");
      if (data?.success) {
        setUser(null);
        return data;
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, isLoggedIn, setIsLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom Hook for Using Context
export const useAuth = () => {
  return useContext(AuthContext);
};
