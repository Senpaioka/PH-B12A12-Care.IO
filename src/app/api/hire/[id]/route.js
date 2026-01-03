import { dbConnect, collections } from "@/db/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
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

    // Convert _id to string
    hire._id = hire._id.toString();

    return new Response(JSON.stringify(hire), { status: 200 });
  } catch (error) {
    console.error("Fetch hire error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
