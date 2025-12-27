import bcrypt from "bcryptjs";
import { dbConnect, collections } from "@/db/dbConnect";

export async function POST(req) {
  try {
    // Get user IP from headers (set by middleware)
    const ip = req.headers.get("x-user-ip") || "unknown";

    // Get body data
    const body = await req.json();
    const { username, email, password, photoURL } = body;

    if (!email || !password) {
      return Response.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to collection
    const userCollection = dbConnect(collections.USERS);

    // Check if user exists
    const existingUser = await userCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return Response.json({
        success: false,
        error: {
          code: "USER_EXISTS",
          message: "An account with this email already exists",
        },
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = {
      username: username?.trim(),
      email: email.toLowerCase(),
      photoURL: photoURL || null,
      password: hashedPassword,

      role: "user",
      status: "active",
      provider: "credentials",

      location: {
        ip: ip,
        city: null,
        country: null,
      },

      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
    };

    // Insert into DB
    const result = await userCollection.insertOne(newUser);

    return Response.json({
      success: true,
      data: {
        id: result.insertedId.toString(),
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register API Error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
