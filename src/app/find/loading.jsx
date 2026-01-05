import CaregiverCardSkeleton from "@/components/caregiver/CaregiverCardSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">
        Finding caregivers...
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CaregiverCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
