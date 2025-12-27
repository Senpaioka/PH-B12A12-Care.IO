import { OAuth2Client } from "google-auth-library";
import { dbConnect, collections } from "@/db/dbConnect";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req) {

  try {
    // getting client Ip
    const ip = req.headers.get("x-user-ip") || "unknown";
    const { credential } = await req.json();

    if (!credential) {
      return Response.json(
        { success: false, message: "Missing Google credential" },
        { status: 400 }
      );
    }

    // verify google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return Response.json(
        { success: false, message: "Invalid Google token payload" },
        { status: 400 }
      );
    }

    const userCollection = dbConnect(collections.USERS);
    const email = payload.email.toLowerCase();
    const now = new Date();

    // check user
    const isExists = await userCollection.findOne({ email });

    if (isExists) {
      return Response.json(
        {
          success: false,
          message: "Account already exists. Please login instead.",
        },
        { status: 409 }
      );
    }

    // Create new Google user
    const result = await userCollection.insertOne({
      username: payload.name || email.split("@")[0],
      email,
      photoURL: payload.picture || null,
      provider: "google",
      role: "user",
      status: "active",

      location: {
        ip: ip,
        city: null,
        country: null,
      },

      createdAt: now,
      updatedAt: now,
      lastLogin: now,
    });

    return Response.json(
      {
        success: true,
        data: {
          id: result.insertedId.toString(),
          email,
          username: payload.name,
          photoURL: payload.picture,
          provider: "google",
        },
      },
      { status: 201 }
    );

  }catch (error) {
    console.error("Register API Error:", error);

    return Response.json(
      {
        success: false,
        message: "Google registration failed",
      },
      { status: 500 }
    );
  }
}
