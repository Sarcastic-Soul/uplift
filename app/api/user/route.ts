import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, user } = auth();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("uplift");
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ userId });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 200 });
    }

    // Create new user
    const newUser = {
      userId,
      email: user.emailAddresses[0].emailAddress,
      createdAt: new Date(),
      stats: {
        moodStreak: 0,
        journalStreak: 0,
      },
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}