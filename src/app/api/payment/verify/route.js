// import Stripe from "stripe";
// import { dbConnect, collections } from "@/db/dbConnect";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const sessionId = searchParams.get("session_id");

//   if (!sessionId) {
//     return Response.json({ error: "Missing session_id" }, { status: 400 });
//   }

//   const session = await stripe.checkout.sessions.retrieve(sessionId);

//   if (session.payment_status !== "paid") {
//     return Response.json({ error: "Payment not completed" }, { status: 400 });
//   }

//   const payments = dbConnect(collections.PAYMENTS);

//   await payments.updateOne(
//     { stripeSessionId: session.id },
//     {
//       $set: {
//         status: "paid",
//         paidAt: new Date(),
//         stripePaymentIntent: session.payment_intent,
//       },
//     }
//   );

//   return Response.json({ success: true });
// }


import Stripe from "stripe";
import { dbConnect, collections } from "@/db/dbConnect";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json({ error: "Missing session_id" }, { status: 400 });
    }

    // 1️⃣ Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return Response.json({ error: "Payment not completed" }, { status: 400 });
    }

    const payments = dbConnect(collections.PAYMENTS);
    const hires = dbConnect(collections.HIRES);

    const hireId = session.metadata?.hireId;

    if (!hireId) {
      return Response.json({ error: "Missing hireId in metadata" }, { status: 400 });
    }

    const hireObjectId = new ObjectId(hireId);

    // 2️⃣ Update payment → PAID (idempotent)
    await payments.updateOne(
      { stripeSessionId: session.id },
      {
        $set: {
          status: "paid",
          paidAt: new Date(),
          stripePaymentIntent: session.payment_intent,
        },
      }
    );

    // 3️⃣ Delete hire so user cannot pay again
    await hires.deleteOne({ _id: hireObjectId });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Payment success handler error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
