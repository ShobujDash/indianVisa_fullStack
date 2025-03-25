"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

export default function VisaForm() {
  const [formData, setFormData] = useState({
    ivac: "",
    visaType: "",
    webFileNumber: "",
    fullName: "",
    email: "",
    otpPhone: "",
    ivacPassword: "",
    purposeOfVisit: "",
    paymentMethod: "",
    paymentPhone: "",
    attendees: Array(4).fill({ webFileNumber: "", fullName: "" }),
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedAttendees = [...formData.attendees];
      updatedAttendees[index] = { ...updatedAttendees[index], [name]: value };
      setFormData({ ...formData, attendees: updatedAttendees });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log("fromdata", formData);
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/applicants", formData);
      if (data?.success) {
        toast.success(data?.message);
        setFormData({
          ivac: "",
          visaType: "",
          webFileNumber: "",
          fullName: "",
          email: "",
          otpPhone: "",
          ivacPassword: "",
          purposeOfVisit: "",
          paymentMethod: "",
          paymentPhone: "",
          attendees: Array(4).fill({ webFileNumber: "", fullName: "" }),
        });
      } else {
        toast.error(data?.message);
        toast.success(data?.message);
        setFormData({
          ivac: "",
          visaType: "",
          webFileNumber: "",
          fullName: "",
          email: "",
          otpPhone: "",
          ivacPassword: "",
          purposeOfVisit: "",
          paymentMethod: "",
          paymentPhone: "",
          attendees: Array(4).fill({ webFileNumber: "", fullName: "" }),
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Visa Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <select
            name="ivac"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          >
            <option value="">Select IVAC</option>
            <option value="IVAC, RAJSHAHI">IVAC, RAJSHAHI</option>
            <option value="IVAC, KHULNA">IVAC, KHULNA</option>
            <option value="IVAC, SYLHET">IVAC, SYLHET</option>
            <option value="IVAC, CHITTAGONG">IVAC, CHITTAGONG</option>
            <option value="IVAC, RANGPUR">IVAC, RANGPUR</option>
            <option value="IVAC, MYMENSINGH">IVAC, MYMENSINGH</option>
            <option value="IVAC, BARISAL">IVAC, BARISAL</option>
            <option value="IVAC, JESSORE">IVAC, JESSORE</option>
            <option value="IVAC, Dhaka (JFP)" selected>
              IVAC, Dhaka (JFP)
            </option>
            <option value="IVAC, THAKURGAON">IVAC, THAKURGAON</option>
            <option value="IVAC, BOGURA">IVAC, BOGURA</option>
            <option value="IVAC, SATKHIRA">IVAC, SATKHIRA</option>
            <option value="IVAC, CUMILLA">IVAC, CUMILLA</option>
            <option value="IVAC, NOAKHALI">IVAC, NOAKHALI</option>
            <option value="IVAC, BRAHMANBARIA">IVAC, BRAHMANBARIA</option>
            <option value="IVAC, KUSHTIA">IVAC, KUSHTIA</option>
          </select>

          <select
            name="visaType"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          >
            <option value="">Select Visa Type</option>
            <option value="MEDICAL/MEDICAL ATTENDANT VISA">
              MEDICAL/MEDICAL ATTENDANT VISA
            </option>
            <option value="BUSINESS VISA">BUSINESS VISA</option>
            <option value="ENTRY VISA">ENTRY VISA</option>
            <option value="STUDENT VISA">STUDENT VISA</option>
          </select>
        </div>
        <h3 className="text-md">Main Applicant</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6">
            <input
              type="text"
              name="webFileNumber"
              placeholder="Web File Number"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <input
              type="text"
              name="otpPhone"
              placeholder="Otp Phone"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6">
            <input
              type="password"
              name="ivacPassword"
              placeholder="IVAC Password"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <input
              type="text"
              name="purposeOfVisit"
              placeholder="Purpose of Visit"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
        </div>

        {formData.attendees.map((attendee, index) => (
          <div key={index}>
            <h3 className="text-md mb-2">Attendees {index + 1}</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="webFileNumber"
                placeholder="Web File Number"
                className="w-full p-2 border rounded"
                onChange={(e) => handleChange(e, index)}
              />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          </div>
        ))}
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6">
            <select
              name="paymentMethod"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            >
              <option value="">Select Payment Method</option>
              <option value="upay">Upay</option>
              <option value="dbblmobilebanking">Rocket</option>
              <option value="mycash">Mercantile Bank MyCash</option>
              <option value="mobilemoney">Tap - Trust And Pay</option>
              <option value="okwallet">One Bank Wallet</option>
            </select>
          </div>
          <div className="col-span-12 sm:col-span-6">
            <input
              type="text"
              name="paymentPhone"
              placeholder="Payment Phone"
              className="w-full p-2 border rounded"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded w-full cursor-pointer"
        >
          Save File
        </button>
      </form>
    </div>
  );
}
