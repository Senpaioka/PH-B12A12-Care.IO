"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";


export default function ProfessionalProfileUI({ profile }) {

    const { data: session } = useSession();
    const isOwnProfile = session?.user?.email === profile.email;
    const isAvailable = !!profile.available;  // converts to true/false
    const isApproved = !!profile.approved;
  
    return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
        <div className="relative w-32 h-32 shrink-0">
          <Image
            src={profile.photoURL}
            alt={profile.fullName}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{profile.fullName}</h1>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                profile.approved
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {profile.approved ? "Approved" : "Pending Approval"}
            </span>

            {/* Hire button */}
            {!isOwnProfile && (
              <button
                disabled={!(isAvailable && isApproved)}
                className={`ml-auto rounded-lg px-5 py-2 text-white ${
                  isAvailable && isApproved
                    ? "bg-primary cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isAvailable && isApproved ? "Hire" : isApproved ? "Hired" : "Not Approved"}
              </button>
            )}
          </div>

          <p className="text-gray-500 mt-1">
            {profile.employmentType} • {profile.experience} Years Experience
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Info label="Gender" value={profile.gender} />
            <Info label="Nationality" value={profile.nationality} />
            <Info label="Country" value={profile.country} />
            <Info label="Languages" value={profile.languages} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-6">
          <Section title="Roles">
            <TagList items={profile.roles || []} />
          </Section>

          <Section title="Skills">
            <TagList items={profile.skills || []} />
          </Section>

          <Section title="Certifications">
            <p className="text-gray-700">{profile.certifications}</p>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Contact">
            <Detail label="Email" value={profile.email} />
            <Detail label="Phone" value={profile.phone} />
            <Detail label="Address" value={profile.address} />
          </Section>

          <Section title="Professional Info">
            <Detail label="Hourly Charge" value={`$${profile.charge}/hour`} />
            <Detail label="ID Number" value={profile.idNumber} />
          </Section>
        </div>
      </div>
    </div>
  );
}

/* UI helpers */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function TagList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
