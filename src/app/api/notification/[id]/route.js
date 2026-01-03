import { ObjectId } from "mongodb";
import { dbConnect, collections } from "@/db/dbConnect";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { action } = await req.json();

    if (!["accept", "reject"].includes(action)) {
      return Response.json(
        { success: false, message: "Invalid action" },
        { status: 400 }
      );
    }

    const hiresCollection = dbConnect(collections.HIRES);
    const professionalsCollection = dbConnect(collections.PROFESSIONALS);

    const hire = await hiresCollection.findOne({ _id: new ObjectId(id) });

    if (!hire) {
      return Response.json(
        { success: false, message: "Hire request not found" },
        { status: 404 }
      );
    }

    /* -----------------------------------------
       REJECT REQUEST
    ------------------------------------------ */
    if (action === "reject") {
      await hiresCollection.deleteOne({ _id: new ObjectId(id) });

      return Response.json({
        success: true,
        message: "Hire request rejected",
      });
    }

    /* -----------------------------------------
       ACCEPT REQUEST
    ------------------------------------------ */
    if (action === "accept") {
      if (hire.accepted) {
        return Response.json(
          { success: false, message: "Already accepted" },
          { status: 400 }
        );
      }

      // 1. Mark hire as accepted
      await hiresCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            accepted: true,
            updatedAt: new Date(),
          },
        }
      );

      // 2. Mark caregiver as unavailable
      await professionalsCollection.updateOne(
        { email: hire.caregiverEmail },
        {
          $set: {
            available: false,
            updatedAt: new Date(),
          },
        }
      );

      return Response.json({
        success: true,
        message: "Hire request accepted",
      });
    }
  } catch (error) {
    console.error("Hire action error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
