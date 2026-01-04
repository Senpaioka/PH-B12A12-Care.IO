import Stripe from "stripe";
import { dbConnect, collections } from "@/db/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const userSession = await getServerSession(authOptions);
    if (!userSession) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { hireId } = await req.json();

    if (!hireId) {
      return Response.json({ error: "Hire ID required" }, { status: 400 });
    }

    const hires = dbConnect(collections.HIRES);
    const payments = dbConnect(collections.PAYMENTS);

    const hireObjectId = new ObjectId(hireId);

    const hire = await hires.findOne({ _id: hireObjectId });
    if (!hire) {
      return Response.json({ error: "Hire not found" }, { status: 404 });
    }

    // Authorization: Only the user who made the request can pay
    if (hire.userEmail.toLowerCase() !== userSession.user.email.toLowerCase()) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    // 🔁 Prevent duplicate pending payment
    const existingPayment = await payments.findOne({
      hireId: hireObjectId,
      userEmail: hire.userEmail,
      caregiverEmail: hire.caregiverEmail,
      status: "pending",
    });

    // ✅ Create Stripe session
    const amount = hire.amount * 100;
    const currency = hire.currency || "usd";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amount,
            product_data: {
              name: `Hiring ${hire.caregiverName}`,
            },
          },
          quantity: 1,
        },
      ],

      client_reference_id: hireId,
      metadata: {
        hireId,
        userEmail: hire.userEmail,
        caregiverEmail: hire.caregiverEmail,
      },

      success_url: `${process.env.NEXT_PUBLIC_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment-cancel`,
    });

    // Insert new pending payment
    await payments.insertOne({
      hireId: hireObjectId,
      stripeSessionId: session.id,
      amount,
      currency,
      userEmail: hire.userEmail,
      caregiverEmail: hire.caregiverEmail,
      status: "pending",
      createdAt: new Date(),
    });


    return Response.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

