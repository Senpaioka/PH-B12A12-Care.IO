"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. No charges were made.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/notification"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Return to Requests
          </Link>

          <Link
            href="/"
            className="bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Go to Home
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-6">
          You can try again anytime.
        </p>
      </div>
    </div>
  );
}
