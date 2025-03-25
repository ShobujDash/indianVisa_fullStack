"use client";

import Navbar from "@/components/navbar";
import { usePathname, useRouter } from "next/navigation"; // usePathname added
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AddDocumentLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to home only if not already there
    } else if (user?.isAdmin) {
      router.push("/himvai/authentication");
    }
  }, [user]); // Dependency list updated

  if (!user) {
    return <p className="text-center mt-10">Redirecting to login...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-2">{children}</div>
    </>
  );
}
