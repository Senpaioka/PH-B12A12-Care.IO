import Link from "next/link";
import Image from "next/image";

export default function CaregiverCard({ caregiver }) {
  const {
    _id,
    fullName,
    email,
    photoURL,
    gender,
    address,
    country,
    experience,
    employmentType,
    charge,
    roles,
    available,
  } = caregiver;

  return (
    <div className="rounded-xl bg-white shadow-sm hover:shadow-md transition">
      
      {/* Image wrapper */}
      <div className="relative h-48 w-full">
        <Image
          src={photoURL}
          alt={fullName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
          priority={false}
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{fullName}</h2>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {available ? "Available" : "Unavailable"}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          {gender} • {country}
        </p>

        <p className="text-sm text-gray-500">{address}</p>

        <div className="text-sm grid grid-cols-2 gap-2 mt-2">
          <span>Experience: {experience} yrs</span>
          <span>Type: {employmentType}</span>
          <span className="font-medium">৳ {charge}/hr</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {roles.slice(0, 3).map((role, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded"
            >
              {role}
            </span>
          ))}
        </div>

        {available ? (
  <Link
    href={`/profile?email=${encodeURIComponent(caregiver.email)}`}
    className="block mt-4 text-center rounded-lg bg-gray-900 text-gray-300 py-2 hover:bg-gray-600 hover:text-white transition"
  >
    View Details
  </Link>
) : (
  <button
    disabled
    className="block w-full mt-4 text-center rounded-lg bg-gray-300 text-gray-500 py-2 cursor-not-allowed"
  >
    Not Available
  </button>
)}

      </div>
    </div>
  );
}
