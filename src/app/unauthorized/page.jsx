import Link from "next/link";

export const metadata = {
  title: "Unauthorized | care.io",
  description: "You do not have permission to access this page",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-md w-full text-center border border-base-300 rounded-xl p-8 shadow-sm">
        
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M5.454 4.454A9 9 0 1112 21a9 9 0 01-6.546-16.546z"
            />
          </svg>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
        <p className="text-base-content/70 mb-6">
          You do not have permission to view this page.  
          Please contact an administrator if you believe this is a mistake.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>

          <Link href="/dashboard" className="btn btn-outline">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
