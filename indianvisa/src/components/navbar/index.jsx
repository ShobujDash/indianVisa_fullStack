"use client";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-xl font-bold">Indian Visa Application</h1>
      {user ? (
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      ) : (
        <button
          // onClick={() => }
          className="bg-green-500 px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </nav>
  );
}
