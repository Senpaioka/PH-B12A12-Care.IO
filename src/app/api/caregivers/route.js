import { dbConnect, collections } from "@/db/dbConnect";

export async function GET() {
  try {
    const professionalsCollection = dbConnect(collections.PROFESSIONALS);

    const caregivers = await professionalsCollection
      .find({ approved: true })
      .project({
        fullName: 1,
        email: 1,
        photoURL: 1,
        gender: 1,
        address: 1,
        country: 1,
        experience: 1,
        employmentType: 1,
        charge: 1,
        roles: 1,
        available: 1,
      })
      .toArray();

    return Response.json(caregivers);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch caregivers" },
      { status: 500 }
    );
  }
}
