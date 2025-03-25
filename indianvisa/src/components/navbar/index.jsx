"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
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
      <h1
        onClick={() => router.push("add-document")}
        className="text-xl font-bold cursor-pointer"
      >
        Visa Application
      </h1>
      {user ? (
        <Popover>
          <PopoverTrigger className=" bg-blue-500 px-4 py-2 rounded cursor-pointer">
            {user?.name}
          </PopoverTrigger>
          <PopoverContent className="w-40 flex flex-col gap-y-2 mt-3">
            <Button
              onClick={() => router.push("/profile")}
              className="w-full cursor-pointer bg-blue-500"
            >
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              className="w-full cursor-pointer bg-yellow-500"
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
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
