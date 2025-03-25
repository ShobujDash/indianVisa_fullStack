"use client";

import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axiosInstance";
import dayjs from "dayjs";
import { Check, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [selected, setSelected] = useState([]);
  const [userData, setUserData] = useState([]);
  const { user } = useAuth();
  const usreId = user?._id;
  console.log("userId",usreId)
  const route = useRouter();

  console.log("selected", selected);

  const fetchDocumentsData = async () => {
    try {
      const { data } = await axiosInstance.get(`/applicants/getUser/${usreId}`);
      if (data?.success) {
        setUserData(data?.visaApplications);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchDocumentsData();
  }, []);

  // Function to update status before navigation
  // const handleStatusUpdate = async (newStatus, goRoute) => {
  //   if (selected.length === 0) {
  //     toast.error("Please select at least one application.");
  //     return;
  //   }

  //   try {
  //     const { data } = await axiosInstance.post(`/getUser/${usreId}`, {
  //       ids: selected,
  //       status: newStatus,
  //     });

  //     if (data?.success) {
  //       toast.success("Status updated successfully!");
  //       setSelected([]);
  //       await fetchDocumentsData();
  //       route.push(goRoute);
  //     } else {
  //       toast.error("Failed to update status.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     toast.error("Error updating visa applications");
  //   }
  // };

  return (
    <div className="dark:bg-[#181818] dark:text-white bg-gray-100 text-black  min-h-screen">
      <div className="dark:bg-[#181818] dark:text-white bg-white text-black p-2 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">My Applications</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="dark:bg-gray-700 bg-gray-100">
              <th className="p-2 border">
                <input type="checkbox" />
              </th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Visa Type</th>
              <th className="p-2 border">Submission Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((app) => (
              <tr key={app?._id} className="text-center border">
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={selected.includes(app?._id)}
                    onChange={() =>
                      setSelected((prev) =>
                        prev.includes(app?._id)
                          ? prev.filter((item) => item !== app?._id)
                          : [...prev, app?._id]
                      )
                    }
                  />
                </td>
                <td className="p-2 border text-sm">{app?._id}</td>
                <td className="p-2 border text-sm">{app?.fullName}</td>
                <td className="p-2 border text-sm">{app?.visaType}</td>
                <td className="p-2 border text-sm">
                  {dayjs(app?.createdAt).format("DD MMM YYYY")}
                </td>
                <td className="p-2 border">
                  <span
                    className={`${
                      app?.status === "open"
                        ? "bg-blue-100 text-blue-700"
                        : app?.status === "processing"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700"
                    } bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs `}
                  >
                    {app?.status}
                  </span>
                </td>
                <td className="p-2 border flex justify-center gap-2">
                  <button className="bg-blue-500 text-white px-1 py-1 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="bg-green-500 text-white px-1 py-1 rounded">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="bg-red-500 text-white px-1 py-1 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
