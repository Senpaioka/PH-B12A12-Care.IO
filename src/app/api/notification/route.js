import { dbConnect, collections } from "@/db/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { email, role } = session.user;
    const hiresCollection = dbConnect(collections.HIRES);

    let query = {};

    // Normalize email just in case, though regex handles insensitive
    const safeEmail = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const emailRegex = { $regex: new RegExp(`^${safeEmail}$`, "i") };

    const normalizedRole = role?.toLowerCase();

    if (normalizedRole === "user") {
      query = { userEmail: emailRegex };
    } else if (normalizedRole === "caregiver") {
      query = { caregiverEmail: emailRegex };
    } else {
      // If role is neither, return empty or unauthorised? 
      // For safety, let's return empty if role is unknown
      return Response.json([]);
    }

    const hires = await hiresCollection
      .find(query)
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
