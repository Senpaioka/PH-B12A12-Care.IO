import CaregiverCard from "@/components/caregiver/CaregiverCard";

async function getCaregivers() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/caregivers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load caregivers");
  }

  return res.json();
}

export default async function FindCaregiverPage() {
  const caregivers = await getCaregivers();

  return (
    <section className="py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Find a Caregiver</h1>
        <p className="text-gray-600 mt-2">
          Browse verified caregivers and view their profiles
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caregivers.map((caregiver) => (
          <CaregiverCard key={caregiver._id} caregiver={caregiver} />
        ))}
      </div>
    </section>
  );
}
