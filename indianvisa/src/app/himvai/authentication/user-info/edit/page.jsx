"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password:"",
  }); // To store form data separately
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "isAdmin" ? value === "true" : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("fromdata", formData);

    try {
      // Send PUT request to update user data on the backend
      const response = await axiosInstance.post(`/user/create-user`, formData);

      if (response.data?.success) {
        toast.success(response?.data?.message);
        router.push(`/himvai/authentication/user-info`);
        setFormData({
          name: "",
          email: "",
          number: "",
          password: "",
        });
      } else {
        toast.error(response?.data?.message);
        console.error("Error updating user:", response.data?.message);
        setFormData({
          name: "",
          email: "",
          number: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error?.message);
      console.error("Error submitting form:", error);
      setFormData({
        name: "",
        email: "",
        number: "",
        password: "",
      });
    }
  };

  // Ensure that the form is rendered only after userData is loaded

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#181818] p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create An User</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            User Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
            placeholder="Enter user full name"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            User Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleChange}
            placeholder="Enter user email address"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            User Contact Number
          </label>
          <input
            type="text"
            name="number"
            value={formData?.number || ""}
            onChange={handleChange}
            placeholder="Enter user contact number"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            User Password
          </label>
          <input
            type="password"
            name="password"
            value={formData?.password || ""}
            onChange={handleChange}
            placeholder="Enter user password"
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create An User
          </button>
        </div>
      </form>
    </div>
  );
}
