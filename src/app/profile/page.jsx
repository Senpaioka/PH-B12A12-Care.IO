import { dbConnect, collections } from "@/db/dbConnect";
import ProfessionalProfileUI from "@/components/profile/ProfessionalProfileUI";

export default async function ProfilePage({ searchParams }) {
 
  const { email } = await searchParams;

  if (!email) {
    return (
      <div className="text-center py-20 text-gray-500">
        Email not provided
      </div>
    );
  }

  const professionalsCollection = dbConnect(collections.PROFESSIONALS);

  const profile = await professionalsCollection.findOne({
    email: email.toLowerCase(),
  });

  if (!profile) {
    return (
      <div className="text-center py-20 text-gray-600">
        Profile not found
      </div>
    );
  }

  return (
    <ProfessionalProfileUI
      profile={JSON.parse(JSON.stringify(profile))}
    />
  );
}
