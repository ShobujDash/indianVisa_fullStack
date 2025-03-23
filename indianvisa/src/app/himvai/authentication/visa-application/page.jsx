// "use client";
// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableCaption,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "react-toastify";

// export default function VisaDataTable() {
//   const [visaData, setVisaData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;


//   useEffect(() => {
//     const fetchVisaData = async () => {
//       try {
//         const { data } = await axiosInstance.get("/applicants");
//         if (data.success) {
//           setVisaData(data.applications); // Set visaData here
//         } else {
//           toast.error("Failed to fetch visa applications");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching visa applications");
//       }
//     };

//     fetchVisaData();
//   }, []);

//   // Corrected from `data` to `visaData`
//   const paginatedData = visaData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );
//   const totalPages = Math.ceil(visaData.length / itemsPerPage); // Calculate total pages

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Visa Applications Data Table</h2>
//       <Table>
//         <TableCaption>A list of submitted visa applications.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Full Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact Number</TableHead>
//             <TableHead>Visa Type</TableHead>
//             <TableHead>IVAC</TableHead>
//             <TableHead>Web File Number</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {paginatedData.map((applicant) => (
//             <TableRow key={applicant.webFileNumber}>
//               <TableCell>{applicant.fullName}</TableCell>
//               <TableCell>{applicant.email}</TableCell>
//               <TableCell>{applicant.otpPhone}</TableCell>
//               <TableCell>{applicant.visaType}</TableCell>
//               <TableCell>{applicant.ivac}</TableCell>
//               <TableCell>{applicant.webFileNumber}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div className="flex justify-between mt-4">
//         <Button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <div>
//           Page {currentPage} of {totalPages}
//         </div>
//         <Button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState("2025-03-23");
  const dates = [
    "2025-03-20",
    "2025-03-19",
    "2025-03-18",
    "2025-03-17",
    "2025-03-16",
    "2025-03-13",
    "2025-03-12",
    "2025-03-11",
    "2025-03-10",
    "2025-03-09",
    "2025-03-06",
    "2025-03-05",
    "2025-03-04",
    "2025-03-03",
    "2025-03-02",
    "2025-02-27",
    "2025-02-26",
    "2025-02-25",
    "2025-02-24",
    "2025-02-23",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md p-4 rounded-md">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">Welcome! bijoy247</h2>
          <div className="space-x-4 text-sm">
            <a href="#" className="text-blue-500">
              IVAC Entry
            </a>
            <a href="#" className="text-blue-500">
              Thai Entry
            </a>
            <a href="#" className="text-blue-500">
              My Files
            </a>
            <a href="#" className="text-blue-500">
              Add User
            </a>
            <a href="#" className="text-blue-500">
              Change Password
            </a>
            <a href="#" className="text-red-500">
              Logout
            </a>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="bg-gray-800 text-white px-3 py-1 rounded">
            PROCESSING
          </button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded">
            OPEN
          </button>
          {dates.map((date) => (
            <button
              key={date}
              className={`px-3 py-1 rounded ${
                selectedDate === date ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button className="bg-gray-700 text-white px-4 py-1 rounded">
            Copy to Open
          </button>
          <button className="bg-red-500 text-white px-4 py-1 rounded">
            Delete
          </button>
          <input
            type="text"
            placeholder="Priority"
            className="border p-1 rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded">
            Set Priority
          </button>
        </div>

        <div className="mt-4 p-2 bg-gray-200 rounded text-sm">
          <p>Total Entries in PROCESSING: 0. Total BGD: 0</p>
          <p>
            Total Done: 0 [Premium: 0, Urgent: 0, High: 0, Normal: 0, THAI: 0]
          </p>
          <p className="bg-gray-300 p-2 rounded">
            Currently processing no files and File entry Open for {selectedDate}
          </p>
        </div>

        <table className="mt-4 w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border p-2">#</th>
              <th className="border p-2">OTP Phone</th>
              <th className="border p-2">BGDs</th>
              <th className="border p-2">Count</th>
              <th className="border p-2">Mission</th>
              <th className="border p-2">Visa Type</th>
              <th className="border p-2">Info</th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Action</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Ref</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border p-2" colSpan="11">
                No Data Available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
