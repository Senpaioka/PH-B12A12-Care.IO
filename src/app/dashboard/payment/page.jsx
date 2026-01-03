"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function PaymentHistoryPage() {
  const { data: session, status } = useSession();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchPayments = async () => {
      try {
        const res = await fetch("/api/payment/history");
        const data = await res.json();
        if (res.ok) setPayments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please login to view payment history.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No completed payments found.</p>
      ) : (
        <div className="grid gap-4">
          {payments.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <p>
                <strong>Caregiver:</strong> {p.caregiverEmail}
              </p>
              <p>
                <strong>Amount:</strong> {(p.amount / 100).toFixed(2)}{" "}
                {p.currency.toUpperCase()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600 font-medium">Paid</span>
              </p>
              <p>
                <strong>Paid On:</strong>{" "}
                {new Date(p.paidAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
