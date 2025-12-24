"use server";

import bcrypt from "bcryptjs";
import { dbConnect, collections } from "@/db/dbConnect";


export const createUser = async (userData) => {
    if (!userData?.email || !userData?.password) {
      throw new Error("Email and password are required");
    }
  
    // Check if user already exists
    const existingUser = await getUser(userData.email);

    if (existingUser) {
    return {
        success: false,
        error: {
            code: "USER_EXISTS",
            message: "An account with this email already exists",
        },
        };
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
  
    // Prepare user document
    const newUser = {
      username: userData.username?.trim(),
      email: userData.email.toLowerCase(),
      photoURL: userData.photoURL || null,
      password: hashedPassword,
  
      role: "user",
      status: "active",
      provider: "credentials",
  
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
    };
  
    // Save user to database
    const userCollection = dbConnect(collections.USERS);
    const result = await userCollection.insertOne(newUser);
  
    return {
        success: true,
        data: {
          id: result.insertedId.toString(),
          email: newUser.email,
        },
    }
  };



  export const getUser = async (email) => {
    const userCollection = dbConnect(collections.USERS);
    const user = await userCollection.findOne({ email });
    return user;
}



export const loginUser = async (payload) => {
    const { email, password } = payload || {};
  
    if (!email || !password) {
      return {
        success: false,
        error: {
          code: "INVALID_INPUT",
          message: "Email and password are required",
        },
      };
    }
  
    const userCollection = dbConnect(collections.USERS);
    const user = await userCollection.findOne({
      email: email.toLowerCase(),
    });
  
    if (!user) {
      return {
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "Invalid email or password",
        },
      };
    }
  
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      return {
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password",
        },
      };
    }
  
    // Optional: update lastLogin
    await userCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLogin: new Date(),
          updatedAt: new Date(),
        },
      }
    );
  
    return {
      success: true,
      data: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        photoURL: user.photoURL || null,
        role: user.role,
        provider: user.provider,
      },
    };
  };
  

  export const saveGoogleUsers = async (googleUser) => {
    if (!googleUser?.email) {
      return {
        success: false,
        error: {
          code: "INVALID_GOOGLE_USER",
          message: "Google user data is invalid",
        },
      };
    }
  
    const userCollection = dbConnect(collections.USERS);
    const now = new Date();
    const email = googleUser.email.toLowerCase();
  
    const result = await userCollection.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          username: googleUser.name || email.split("@")[0],
          email,
          photoURL: googleUser.image || null,
          role: "user",
          status: "active",
          provider: "google",
          createdAt: now,
        },
        $set: {
          lastLogin: now,
          updatedAt: now,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
  
    const user = result?.value;
    if (!user) return null;

    return {
      success: true,
      data: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        photoURL: user.photoURL,
        role: user.role,
        provider: user.provider,
      },
    };
  };
  