"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function NotificationPage() {
  const { data: session, status } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;
  const userRole = session?.user?.role;

useEffect(() => {
  if (status === "authenticated") {
    fetchRequests();
  }
}, [status]);


const fetchRequests = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/notification");
    const data = await res.json();
    const email = session.user.email.toLowerCase().trim();
    const role = session.user.role;

    let filtered = [];

    if (role === "user") {
      filtered = data.filter(
        r => r.userEmail?.toLowerCase().trim() === email
      );
    }

    if (role === "caregiver") {
      filtered = data.filter(
        r => r.caregiverEmail?.toLowerCase().trim() === email
      );
    }

    setRequests(filtered);
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to load requests", "error");
  } finally {
    setLoading(false);
  }
};


  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`/api/notification/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire("Success", result.message, "success");
        fetchRequests();
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Please login to view notifications.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((r) => (
            <div key={r._id} className="bg-white p-4 rounded-xl shadow">
              <p>
                <span className="font-semibold">Caregiver:</span>{" "}
                {r.caregiverName} ({r.caregiverEmail})
              </p>
              <p>
                <span className="font-semibold">User:</span>{" "}
                {r.userName} ({r.userEmail})
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {r.accepted ? (
                  <span className="text-green-600 font-medium">Accepted</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pending</span>
                )}
              </p>

              {userRole === "user" && r.accepted && (
                <div className="mt-4">
                  <Link href={`/payment/${r._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Proceed to Payment
                  </Link>
                </div>
              )}


              {userRole === "caregiver" && !r.accepted && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleAction(r._id, "accept")}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(r._id, "reject")}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
