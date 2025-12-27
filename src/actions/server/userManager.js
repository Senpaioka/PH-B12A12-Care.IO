"use server";

import bcrypt from "bcryptjs";
import { dbConnect, collections } from "@/db/dbConnect";

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
  

  export const saveGoogleUsers = async (googleUser, ip="unknown") => {
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
          
          location: {
            ip: ip,
            city: null,
            country: null,
          },
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
  