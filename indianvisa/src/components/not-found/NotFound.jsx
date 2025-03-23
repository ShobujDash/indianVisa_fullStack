"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Redirect to homepage
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-lg font-semibold text-red-600">
          Feching Data......
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
