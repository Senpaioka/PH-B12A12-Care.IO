import { dbConnect, collections } from "@/db/dbConnect";

export async function GET() {
  try {
    const hiresCollection = dbConnect(collections.HIRES);

    const hires = await hiresCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(hires);
  } catch (error) {
    console.error("Fetch hires error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch hire requests" },
      { status: 500 }
    );
  }
}
