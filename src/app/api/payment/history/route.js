import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/db/dbConnect";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payments = dbConnect(collections.PAYMENTS);

    const history = await payments
      .find({
        userEmail: session.user.email,
        status: "paid",
      })
      .sort({ paidAt: -1 })
      .toArray();

    return Response.json(history);
  } catch (err) {
    console.error("Payment history error:", err);
    return Response.json({ error: "Failed to load payment history" }, { status: 500 });
  }
}
