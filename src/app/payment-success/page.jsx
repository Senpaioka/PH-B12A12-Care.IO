"use client";

import { useEffect } from "react";
import Link from "next/link";

function SuccessPage() {
  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) return;

      await fetch(`/api/payment/verify?session_id=${sessionId}`);
    };

    verify();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/dashboard/payment"
            className="bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            View Payment History
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-6">
          You may safely close this page.
        </p>
      </div>
    </div>
  );
}

export default SuccessPage;
