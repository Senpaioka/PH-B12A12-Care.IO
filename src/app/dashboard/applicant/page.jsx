"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ApplicantsPage() {

  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all applicants from API
  const fetchApplicants = async () => {
    try {
      const res = await fetch("/api/approve");
      const result = await res.json();

      if (result.success) {
        setProfessionals(result.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch applicants", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchApplicants();
  }, []);

  // Approve / verify a professional
  // const approveProfessional = async (id) => {
  //   try {
  //     const res = await fetch(`/api/approve/${id}`, {
  //       method: "PATCH",
  //     });
  //     const result = await res.json();

  //     if (result.success) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Approved",
  //         text: "Professional has been verified.",
  //         timer: 1500,
  //         showConfirmButton: false,
  //       });
  //       fetchApplicants(); // refresh list
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed",
  //         text: result.message,
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Something went wrong.",
  //     });
  //   }
  // };

const approveProfessional = async (email) => {
  try {
    const res = await fetch("/api/approve/email", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const text = await res.text(); // 👈 safer
    const result = text ? JSON.parse(text) : null;

    if (!result?.success) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: result?.message || "Action failed",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: result.approved ? "Approved" : "Unapproved",
      text: result.message,
      timer: 1500,
      showConfirmButton: false,
    });

    fetchApplicants();

  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong.",
    });
  }
};



  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applicants</h1>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Experience</th>
            <th className="py-2 px-4 text-left">Roles</th>
            <th className="py-2 px-4 text-left">Verified</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {professionals.map((prof) => (
            <tr
              key={prof._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-2 px-4">{prof.fullName}</td>
              <td className="py-2 px-4">{prof.email}</td>
              <td className="py-2 px-4">{prof.phone}</td>
              <td className="py-2 px-4">{prof.experience} yrs</td>
              <td className="py-2 px-4">{prof.roles.join(", ")}</td>
              <td className="py-2 px-4">
                {prof.approved ? (
                  <span className="text-green-600 font-semibold">Verified</span>
                ) : (
                  <span className="text-red-600 font-semibold">Pending</span>
                )}
              </td>
              <td className="py-2 px-4 text-center">

                 <button
                    onClick={() => approveProfessional(prof.email)}
                    className={`btn btn-sm ${
                      prof.approved ? "btn-warning" : "btn-success"
                    }`}
                  >
                    {prof.approved ? "Unapproved" : "Approve"}
                  </button>

                {/* {!prof.approved && (
                  // <button
                  //   onClick={() => approveProfessional(prof._id)}
                  //   className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  // >
                  //   Approve
                  // </button>
                  <button
                    onClick={() => approveProfessional(prof.email)}
                    className={`btn btn-sm ${
                      prof.approved ? "btn-warning" : "btn-success"
                    }`}
                  >
                    {prof.approved ? "Unapproved" : "Approve"}
                  </button>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
