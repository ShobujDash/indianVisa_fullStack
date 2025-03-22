"use client";

import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AddDocumentLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect if not authenticated
    }
  }, [user, router]);

  if (!user) {
    return <p className="text-center mt-10">Redirecting to login...</p>;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
