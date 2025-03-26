"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ mobileNumber, transactionId });
    // You can send this data to your backend for processing
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[#181818] dark:text-white bg-gray-100 p-4">
      <div className="bg-white dark:bg-[#181818] dark:text-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Payment Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transaction ID
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter transaction ID"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}
