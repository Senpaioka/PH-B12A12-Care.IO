import { dbConnect, collections } from "@/db/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    // Unwrap params (it's a promise in Next.js App Router)
    const { params } = context;
    const { id: hireId } = await params; // <-- unwrap promise

    if (!hireId) {
      return new Response(JSON.stringify({ message: "Hire ID is required" }), { status: 400 });
    }

    const hiresCollection = dbConnect(collections.HIRES);

    const hire = await hiresCollection.findOne({ _id: new ObjectId(hireId) });

    if (!hire) {
      return new Response(JSON.stringify({ message: "Hire not found" }), { status: 404 });
    }

    // Authorization Check
    const userEmail = session.user.email.toLowerCase();
    const isParticipant =
      hire.userEmail.toLowerCase() === userEmail ||
      hire.caregiverEmail.toLowerCase() === userEmail;

    if (!isParticipant && session.user.role !== 'admin') {
      return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
    }

    // Convert _id to string
    hire._id = hire._id.toString();

    return new Response(JSON.stringify(hire), { status: 200 });
  } catch (error) {
    console.error("Fetch hire error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}


