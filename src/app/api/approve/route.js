import { dbConnect, collections } from "@/db/dbConnect";

export async function GET() {
  try {
    const professionalsCollection = dbConnect(collections.PROFESSIONALS);

    // Fetch all professionals
    // You can filter if needed: { approved: false }
    const professionals = await professionalsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(
      { success: true, data: professionals },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch applicants error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
