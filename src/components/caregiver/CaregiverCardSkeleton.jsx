export default function CaregiverCardSkeleton() {
 
    return (
        <div className="rounded-xl bg-white shadow-sm animate-pulse">
        {/* Image */}
        <div className="h-48 w-full bg-gray-200 rounded-t-xl" />

        <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
            </div>

            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />

            <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div className="flex gap-2 mt-2">
            <div className="h-5 w-14 bg-gray-200 rounded" />
            <div className="h-5 w-14 bg-gray-200 rounded" />
            <div className="h-5 w-14 bg-gray-200 rounded" />
            </div>

            <div className="h-10 w-full bg-gray-300 rounded-lg mt-4" />
        </div>
        </div>
  );
}
