import { dbConnect, collections } from "@/db/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "admin") {
      return Response.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const professionalsCollection = dbConnect(collections.PROFESSIONALS);
    const usersCollection = dbConnect(collections.USERS);

    // 1. Find professional
    const professional = await professionalsCollection.findOne({ email });

    if (!professional) {
      return Response.json(
        { success: false, message: "Professional not found" },
        { status: 404 }
      );
    }

    // 2. Toggle approval
    const newApproved = !professional.approved;

    // 3. Determine role based on approval
    const newRole = newApproved ? "caregiver" : "user";

    // 4. Update PROFESSIONALS collection
    await professionalsCollection.updateOne(
      { email },
      {
        $set: {
          approved: newApproved,
          updatedAt: new Date(),
        },
      }
    );

    // 5. Update USERS collection role
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          role: newRole,
          updatedAt: new Date(),
        },
      }
    );

    return Response.json({
      success: true,
      approved: newApproved,
      role: newRole,
      message: newApproved
        ? "Professional approved and role updated to caregiver"
        : "Professional unapproved and role reverted to user",
    });

  } catch (error) {
    console.error("Approve error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
