import { dbConnect, collections } from "@/db/dbConnect";
import { getToken } from "next-auth/jwt";


export async function PATCH(req) {
  try {
    const { email: caregiverEmail } = await req.json();

    if (!caregiverEmail) {
      return Response.json(
        { success: false, message: "Caregiver email is required" },
        { status: 400 }
      );
    }

    // Get logged-in user (the one who is hiring)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userEmail = token.email.toLowerCase();
    const userName = token.name;

    const professionalsCollection = dbConnect(collections.PROFESSIONALS);
    const hiresCollection = dbConnect(collections.HIRES);

    // Normalize caregiver email for lookup
    const normalizedCaregiverEmail = caregiverEmail.toLowerCase();

    const caregiver = await professionalsCollection.findOne({ email: normalizedCaregiverEmail });
    if (!caregiver) {
      return Response.json({ success: false, message: "Caregiver not found" }, { status: 404 });
    }

    if (!caregiver.available) {
      return Response.json({ success: false, message: "Caregiver is already hired" }, { status: 400 });
    }

    // Check if there is already a pending hire
    const existingHire = await hiresCollection.findOne({
      caregiverEmail: normalizedCaregiverEmail,
      userEmail,
      accepted: false,
    });

    if (existingHire) {
      return Response.json({
        success: false,
        message: "You already requested to hire this caregiver",
      }, { status: 400 });
    }

    // Add to hires collection with accepted: false
    await hiresCollection.insertOne({
      caregiverEmail: normalizedCaregiverEmail,
      caregiverName: caregiver.fullName,
      userEmail,
      userName,
      amount: caregiver.charge,
      accepted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json({
      success: true,
      message: "Hire request sent. Waiting for caregiver approval",
    });

  } catch (error) {
    console.error("Hire error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
