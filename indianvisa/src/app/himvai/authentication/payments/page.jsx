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

const paymentData = Array.from({ length: 30 }, (_, index) => ({
  transactionId: `TXN00${index + 1}`,
  payerName: `Payer ${index + 1}`,
  paymentMethod: index % 2 === 0 ? "Visa" : "Bkash",
  amount: `${800 + index * 10} BDT`,
  status: index % 3 === 0 ? "Completed" : "Pending",
}));

const PAGE_SIZE = 5;

export default function PaymentDataTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(paymentData.length / PAGE_SIZE);

  const paginatedData = paymentData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">SSLCommerz Payment Data Table</h2>
      <Table>
        <TableCaption>List of Payments Processed via SSLCommerz</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Payer Name</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((payment) => (
            <TableRow key={payment.transactionId}>
              <TableCell>{payment.transactionId}</TableCell>
              <TableCell>{payment.payerName}</TableCell>
              <TableCell>{payment.paymentMethod}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.status}</TableCell>
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
