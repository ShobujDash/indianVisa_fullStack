

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

const applications = Array.from({ length: 30 }, (_, index) => ({
  mission: index % 2 === 0 ? "Dhaka" : "Chittagong",
  webFileNumber: `WFN00${index + 1}`,
  ivacCenter: index % 2 === 0 ? "Dhaka" : "Chittagong",
  visaType: index % 2 === 0 ? "Tourist" : "Business",
  familyMembers: String(index % 5),
  visitPurpose: index % 2 === 0 ? "Vacation" : "Business Meeting",
  amount: `BDT ${5000 + index * 100}.00`,
}));

const PAGE_SIZE = 5;

export default function VisaApplicationTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(applications.length / PAGE_SIZE);

  const paginatedData = applications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Visa Application Data Table</h2>
      <Table>
        <TableCaption>A list of your recent visa applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Mission</TableHead>
            <TableHead>Web File Number</TableHead>
            <TableHead>IVAC Center</TableHead>
            <TableHead>Visa Type</TableHead>
            <TableHead>Family Members</TableHead>
            <TableHead>Visit Purpose</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((app) => (
            <TableRow key={app.webFileNumber}>
              <TableCell>{app.mission}</TableCell>
              <TableCell>{app.webFileNumber}</TableCell>
              <TableCell>{app.ivacCenter}</TableCell>
              <TableCell>{app.visaType}</TableCell>
              <TableCell>{app.familyMembers}</TableCell>
              <TableCell>{app.visitPurpose}</TableCell>
              <TableCell className="text-right">{app.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="font-bold">
              Total
            </TableCell>
            <TableCell className="text-right font-bold">
              BDT{" "}
              {applications.reduce(
                (total, app) =>
                  total +
                  parseInt(app.amount.replace("BDT ", "").replace(".00", "")),
                0
              )}
              .00
            </TableCell>
          </TableRow>
        </TableFooter>
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