"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PAGE_SIZE = 5;

export default function PersonalInformationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axiosInstance.get("/user");
        if (data?.success) {
          setUsers(data?.users);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching visa applications");
      }
    };

    fetchUserData();
  }, []);

  const paginatedData = users?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(users?.length / itemsPerPage); // Calculate total pages

  const handleEdit = async (id) => {
    // Navigate to the edit page with the user id
    router.push(`/himvai/authentication/user-info/edit/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/user/delete/${id}`);
      if (response?.data?.success) {
        toast.success("User deleted successfully");
        let filteredUser = users.filter((user) => user._id !== id);
        setUsers([...filteredUser]); // Remove the deleted user from state
      } else {
        toast.error(response?.data?.message || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user account");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Personal Information Data Table
      </h2>
      <Table>
        <TableCaption>A list of your saved personal information.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Is Admin</TableHead>
            {/* <TableHead>Password</TableHead> */}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((use) => (
            <TableRow key={use?._id}>
              <TableCell>{use?.name}</TableCell>
              <TableCell>{use?.email}</TableCell>
              <TableCell>{use?.number}</TableCell>
              <TableCell
                className={`${
                  use?.isAdmin ? "text-green-700" : "text-red-700"
                }`}
              >
                {use?.isAdmin ? "True" : "False"}
              </TableCell>
              {/* <TableCell>{use?.password}</TableCell> */}
              <TableCell className="flex gap-2">
                <Button
                  onClick={() => handleEdit(use?._id)}
                  className="bg-green-800 cursor-pointer"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(use?._id)}
                  className="mr-2 bg-red-600 cursor-pointer"
                >
                  Delete
                </Button>
              </TableCell>
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
