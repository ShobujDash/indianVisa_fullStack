"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const personalInfoData = Array.from({ length: 30 }, (_, index) => ({
  fullName: `Person ${index + 1}`,
  emailAddress: `person${index + 1}@example.com`,
  contactNumber: `01718484${100 + index}`,
  webFileNumber: `WFN00${index + 1}`,
}));

const PAGE_SIZE = 5;

export default function PersonalInformationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const {user} = useAuth()

  const totalPages = Math.ceil(personalInfoData.length / PAGE_SIZE);

  const paginatedData = personalInfoData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

 

  return (

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">
          Personal Information Data Table
        </h2>
        <Table>
          <TableCaption>
            A list of your saved personal information.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Web File Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((info) => (
              <TableRow key={info.webFileNumber}>
                <TableCell>{info.fullName}</TableCell>
                <TableCell>{info.emailAddress}</TableCell>
                <TableCell>{info.contactNumber}</TableCell>
                <TableCell>{info.webFileNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
 
  );
}
