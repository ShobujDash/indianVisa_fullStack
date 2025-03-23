"use client";

import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const { user, logout } = useAuth();
  const router = useRouter()
  const handleLogout = async () => {
    const data = await logout();
    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.error("Logout fail");
    }
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-xl font-bold">Indian Visa Application</h1>
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      ) : (
        <button
          // onClick={() => router.push("/")}
          className="bg-green-500 px-4 py-2 rounded cursor-pointer"
        >
          Login
        </button>
      )}
    </nav>
  );
}
