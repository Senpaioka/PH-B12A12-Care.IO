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
import { sendPaymentConfirmationEmail } from "@/lib/email";

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

    // 3️⃣ Update hire status to "paid" (instead of deleting)
    await hires.updateOne(
      { _id: hireObjectId },
      {
        $set: {
          status: "paid",
          paidAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    // 4️⃣ Send Confirmation Emails
    // We do this asynchronously without awaiting to not block the response, 
    // or we can await if critical. Given this is a background call (webhook-ish style), awaiting is safe.

    // We need some hire details for the email (name, amount, etc)
    // Fetch the updated hire doc or use metadata if available. 
    // Metadata can be strings, so better to fetch fresh doc or use what we have.
    // Let's fetch the fresh hire doc to be sure.
    const updatedHire = await hires.findOne({ _id: hireObjectId });

    if (updatedHire) {
      await sendPaymentConfirmationEmail({
        userEmail: updatedHire.userEmail,
        userName: updatedHire.userName,
        caregiverEmail: updatedHire.caregiverEmail,
        caregiverName: updatedHire.caregiverName,
        amount: updatedHire.amount, // assuming simple number
        currency: "USD", // default or fetch from hire if stored
        date: new Date(),
      });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Payment success handler error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
