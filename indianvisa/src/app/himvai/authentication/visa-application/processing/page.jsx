"use client";

import { useState, useEffect } from "react";
import { Eye, Check, X, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selected, setSelected] = useState([]);
  const [applications, setApplications] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const fetchDocumentsData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/applicants/status/processing"
        );
        if (data?.success) {
          setApplications(data?.applications);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching visa applications");
      }
    };

    fetchDocumentsData();
  }, []);

  return (
    <div className="dark:bg-[#181818] dark:text-white bg-gray-100 text-black  min-h-screen">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => route.push("/himvai/authentication/visa-application")}
          className=" text-black dark:text-white px-2 py-1 text-sm rounded border cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-[#181818] dark:text-white text-black  px-2 py-1 text-sm border-2 dark:border-white border-black rounded cursor-pointer">
            Copy Failed to Open
          </button>
          <button className="bg-purple-600 text-white px-2 py-1 text-sm rounded border-2 dark:border-white border-purple-700">
            Processing
          </button>
          <button
            onClick={() =>
              route.push("/himvai/authentication/visa-application/open")
            }
            className="bg-white dark:bg-[#181818] dark:text-white text-black  px-2 py-1 text-sm border-2 dark:border-white border-black rounded cursor-pointer"
          >
            Open
          </button>
          <button
            onClick={() =>
              route.push("/himvai/authentication/visa-application/failed")
            }
            className="bg-white dark:bg-[#181818] dark:text-white text-black  px-2 py-1 text-sm border-2 dark:border-white border-black rounded cursor-pointer"
          >
            Failed
          </button>
          <button
            onClick={() => {
              if (selected.length === applications.length) {
                setSelected([]); // Unselect all
              } else {
                setSelected(applications.map((app) => app._id)); // Select all
              }
            }}
            className="bg-white dark:bg-[#181818] dark:text-white text-black  px-2 py-1 text-sm border-2 dark:border-white border-black rounded cursor-pointer"
          >
            Select All
          </button>
          <button className="bg-white dark:bg-[#181818] dark:text-white text-black  px-2 py-1 text-sm border-2 dark:border-white border-black rounded cursor-pointer">
            Send to Processing
          </button>
        </div>
      </div>

      <div className="dark:bg-[#181818] dark:text-white bg-white text-black p-2 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Applications</h2>
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
            {applications.map((app) => (
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
