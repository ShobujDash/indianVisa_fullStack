"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

export default function UpdateUser() {
  const [userData, setUserData] = useState(null); // To store the fetched user data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    isAdmin: false,
    password:"",
  }); // To store form data separately

  const router = useRouter();
  const { id } = useParams(); // Access params using useParams
  const userId = id; // The user id in the URL

  // Fetch user data when component mounts or userId changes
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const { data } = await axiosInstance.get(`/user/${userId}`);
        if (data?.success) {
          setUserData(data?.user);
          setFormData({
            name: data?.user.name || "",
            email: data?.user.email || "",
            number: data?.user.number || "",
            isAdmin: data?.user.isAdmin || false,
            password:data?.user?.password || "",
          });
        } else {
          console.error(data?.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "isAdmin" ? value === "true" : value,
    });
  };

const onSubmit = async (e) => {
  e.preventDefault();

  try {
    // Send PUT request to update user data on the backend
    const response = await axiosInstance.put(`/user/update/${userId}`, formData);

    if (response.data?.success) {
      // console.log("User updated successfully", response.data);
      toast.success(response?.data?.message)
      // Redirect or show success message
      router.push(`/himvai/authentication/user-info`); // Redirect to the updated user profile page
    } else {
      console.error("Error updating user:", response.data?.message);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  // Ensure that the form is rendered only after userData is loaded
  if (!userData) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#181818] p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Personal Info
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Your Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Your Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Your Contact Number
          </label>
          <input
            type="text"
            name="number"
            value={formData?.number || ""}
            onChange={handleChange}
            placeholder="Enter your contact number"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Change Password
          </label>
          <input
            type="text"
            name="password"
            value={formData?.password || ""}
            onChange={handleChange}
            placeholder="Enter your contact number"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Is Admin
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="isAdmin"
                value="true"
                checked={formData?.isAdmin === true}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isAdmin"
                value="false"
                checked={formData?.isAdmin === false}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}
