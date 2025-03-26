"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  mobileNumber: z.string().min(11, { message: "Invalid mobile number" }),
});

export default function PaymentForm() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { mobileNumber: "" },
  });

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setOtpSent(true);
  };

  const paymentMethods = [
    { name: "Visa", src: "/visa.png" },
    { name: "MasterCard", src: "/mastercard.png" },
    { name: "Bkash", src: "/bkash.png" },
    { name: "Rocket", src: "/rocket.png" },
    { name: "Nagad", src: "/nagad.png" },
    { name: "DBBL Nexus", src: "/dbbl.png" },
    { name: "QCash", src: "/qcash.png" },
    { name: "MTB", src: "/mtb.png" },
    { name: "AB Bank", src: "/abbank.png" },
    { name: "Tap", src: "/tap.png" },
    { name: "Ok Wallet", src: "/okwallet.png" },
  ];

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-[#181818] p-6 shadow-lg rounded-lg">
      <img
        src="/sslcommerz.png"
        alt="SSLCommerz"
        className="w-32 mx-auto mb-4"
      />
      <p className="text-center text-gray-500 mb-4">
        Please choose a payment option from the left side
      </p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.name}
            onClick={() => handlePaymentMethodSelect(method.name)}
            className={`p-2 border rounded-lg ${
              selectedPaymentMethod === method.name ? "bg-gray-200" : ""
            }`}
          >
            <img
              src={method.src}
              alt={method.name}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#181818] dark:text-white p-4 shadow rounded-lg mb-4">
        <p>FEES: 800 BDT</p>
        <p>Convenience Fees: 24 BDT</p>
        <p>Payable Amount: 824 BDT</p>

        <Form {...form}>
          <form
            className="dark:bg-[#181818] dark:text-white"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile No:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your mobile number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2">
              {otpSent ? "Resend OTP" : "Send OTP"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>Appointment Date:</label>
          <Input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <label>Appointment Time:</label>
          <Input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
        </div>
      </div>

      <Button className="w-full bg-red-500 mt-4" disabled={!otpSent}>
        Pay Now
      </Button>

      <div className="text-red-500 text-center mt-2">
        Please complete your transaction within 5 minutes to get the appointment
        date successfully
      </div>
    </div>
  );
}
