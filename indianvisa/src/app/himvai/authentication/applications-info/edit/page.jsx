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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  mission: z.string().min(1, { message: "Mission is required" }),
  webFileNumber: z.string().min(1, { message: "Web file number is required" }),
  confirmWebFileNumber: z
    .string()
    .min(1, { message: "Please confirm web file number" }),
  ivacCenter: z.string().min(1, { message: "IVAC center is required" }),
  visaType: z.string().min(1, { message: "Visa type is required" }),
  familyMembers: z.string(),
  visitPurpose: z.string().optional(),
});

export default function VisaApplicationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mission: "",
      webFileNumber: "",
      confirmWebFileNumber: "",
      ivacCenter: "",
      visaType: "",
      familyMembers: "0",
      visitPurpose: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#181818] p-6 shadow-lg rounded-lg text-gray-900 dark:text-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Visa Application Form
      </h2>
 

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Mission Selection */}
          <FormField
            control={form.control}
            name="mission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Mission</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a High Commission" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Web File Number */}
          <FormField
            control={form.control}
            name="webFileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your Web File Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Web File Number"
                    className="dark:bg-gray-800 dark:text-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Web File Number */}
          <FormField
            control={form.control}
            name="confirmWebFileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your Web File Number Again</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Re-enter Web File Number"
                    className="dark:bg-gray-800 dark:text-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IVAC Center */}
          <FormField
            className="w-full"
            control={form.control}
            name="ivacCenter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Your IVAC Center</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an IVAC Center" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Visa Type */}
          <FormField
            control={form.control}
            name="visaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Visa Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tourist">Tourist</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Family Members */}
          <FormField
            control={form.control}
            name="familyMembers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Family Members / Co-Applicant</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="dark:bg-gray-800 dark:text-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Visit Purpose */}
          <FormField
            control={form.control}
            name="visitPurpose"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Visit Purpose Details</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter visit purpose"
                    className="dark:bg-gray-800 dark:text-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount Display */}
          <div className="text-lg font-bold md:col-span-2 text-center">
            Amount: BDT 0.00
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <Button
              type="submit"
              className="px-6 py-2 text-lg dark:bg-gray-700 dark:text-white"
            >
              Save and Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
