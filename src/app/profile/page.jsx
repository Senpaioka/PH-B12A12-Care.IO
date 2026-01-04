import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 
import { dbConnect, collections } from "@/db/dbConnect";
import ProfessionalProfileUI from "@/components/profile/ProfessionalProfileUI";

export default async function ProfilePage({ searchParams }) {
  const { email } = await searchParams;

  if (!email) {
    return <div className="text-center py-20">Email not provided</div>;
  }

  // Get logged-in user
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email ?? null;

  const professionals = dbConnect(collections.PROFESSIONALS);
  const profile = await professionals.findOne({
    email: email.toLowerCase(),
  });

  if (!profile) {
    return <div className="text-center py-20">Profile not found</div>;
  }

  return (
    <ProfessionalProfileUI
      profile={JSON.parse(JSON.stringify(profile))}
      currentUserEmail={currentUserEmail}
    />
  );
}
