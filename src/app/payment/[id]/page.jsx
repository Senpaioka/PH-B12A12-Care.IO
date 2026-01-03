// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// export default function PaymentPage() {
//   const params = useParams();
//   const router = useRouter();
//   const hireId = params.id;

//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch("/api/create-checkout-session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hireId }),
//       });

//       const data = await res.json();

//       if (data.url) {
//         // redirect to Stripe Checkout
//         window.location.href = data.url;
//       } else {
//         Swal.fire("Error", "Failed to create checkout session", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Something went wrong", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-16 text-center">
//       <h1 className="text-2xl font-bold mb-6">Payment</h1>
//       <p className="mb-6">You are about to pay for your hire request.</p>

//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {loading ? "Redirecting..." : "Pay Now"} 
//       </button>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function PaymentPage() {
  const params = useParams();
  const hireId = params.id;

  const [loading, setLoading] = useState(false);
  const [hire, setHire] = useState(null);
  const [fetching, setFetching] = useState(true);

  // Fetch hire details
  useEffect(() => {
    if (!hireId) return;

    const fetchHire = async () => {
      setFetching(true);
      try {
        const res = await fetch(`/api/hire/${hireId}`); 
        const data = await res.json();
        if (res.ok) {
          setHire(data);
        } else {
          Swal.fire("Error", data.message || "Failed to fetch hire details", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong while fetching hire", "error");
      } finally {
        setFetching(false);
      }
    };

    fetchHire();
  }, [hireId]);

  const handlePayment = async () => {
    if (!hire) return;

    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hireId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe
      } else {
        Swal.fire("Error", "Failed to create checkout session", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-16">Loading hire details...</div>;
  if (!hire) return <div className="text-center py-16">Hire request not found.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Details</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <p>
          <span className="font-semibold">Caregiver:</span> {hire.caregiverName} ({hire.caregiverEmail})
        </p>
        <p>
          <span className="font-semibold">User:</span> {hire.userName} ({hire.userEmail})
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {hire.accepted ? (
            <span className="text-green-600 font-medium">Accepted</span>
          ) : (
            <span className="text-yellow-600 font-medium">Pending</span>
          )}
        </p>
        <p>
          <span className="font-semibold">Amount:</span> ${hire.amount} {/* Or dynamic */}
        </p>
        <p>
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(hire.createdAt).toLocaleString()}
        </p>
      </div>

      {hire.accepted ? (
        <div className="text-center">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Pay Now"}
          </button>
        </div>
      ) : (
        <p className="text-center text-red-500 font-medium">
          Cannot pay until caregiver accepts the request.
        </p>
      )}
    </div>
  );
}
