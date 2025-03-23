"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

export default function VisaDataTable() {
  const [visaData, setVisaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  console.log(visaData)

  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        const { data } = await axiosInstance.get("/applicants");
        if (data.success) {
          setVisaData(data.applications); // Set visaData here
        } else {
          toast.error("Failed to fetch visa applications");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching visa applications");
      }
    };

    fetchVisaData();
  }, []);

  // Corrected from `data` to `visaData`
  const paginatedData = visaData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(visaData.length / itemsPerPage); // Calculate total pages

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Visa Applications Data Table</h2>
      <Table>
        <TableCaption>A list of submitted visa applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Visa Type</TableHead>
            <TableHead>IVAC</TableHead>
            <TableHead>Web File Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((applicant) => (
            <TableRow key={applicant.webFileNumber}>
              <TableCell>{applicant.fullName}</TableCell>
              <TableCell>{applicant.email}</TableCell>
              <TableCell>{applicant.otpPhone}</TableCell>
              <TableCell>{applicant.visaType}</TableCell>
              <TableCell>{applicant.ivac}</TableCell>
              <TableCell>{applicant.webFileNumber}</TableCell>
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
