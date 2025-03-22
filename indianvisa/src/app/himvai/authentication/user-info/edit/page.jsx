"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  emailAddress: z.string().email({ message: "Invalid email address" }),
  contactNumber: z.string().min(11, { message: "Invalid contact number" }),
  webFileNumber: z.string().min(1, { message: "Web file number is required" }),
});

export default function PersonalInformationForm() {
  const [activeTab, setActiveTab] = useState(1); // Personal Info Tab Active

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      contactNumber: "",
      webFileNumber: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setActiveTab(2); // Move to Overview tab after submission
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#181818] p-6 shadow-lg rounded-lg">
      {/* <div className="flex space-x-4 mb-4"> */}
        {/* <button className="flex-1 py-2 px-4 rounded-md bg-gray-200">
          Application Info
        </button> */}
        {/* <button className="flex-1 py-2 px-4 rounded-md bg-green-400 text-white">
          Personal Info
        </button> */}
        {/* <button className="flex-1 py-2 px-4 rounded-md bg-gray-200">
          Overview
        </button> */}
        {/* <button className="flex-1 py-2 px-4 rounded-md bg-gray-200">
          Payment
        </button> */}
      {/* </div> */}
      <h2 className="text-2xl font-bold mb-6 text-center">Personal Info</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your email address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Contact Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your contact number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="webFileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Web File Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your web file number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-6">
            <Button type="submit">Save and Show Overview</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
