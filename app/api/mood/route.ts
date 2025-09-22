import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET handler to fetch all mood entries for the logged-in user
export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("uplift");
    const moodEntries = await db
      .collection("mood_entries")
      .find({ userId })
      .sort({ date: -1 }) // Sort by date descending
      .toArray();

    return NextResponse.json(moodEntries);
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST handler to create a new mood entry
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { moodScore, notes, factors } = await req.json();

    if (!moodScore) {
      return new NextResponse("Missing moodScore", { status: 400 });
    }

    const newMoodEntry = {
      userId,
      date: new Date(),
      moodScore,
      notes: notes || "",
      factors: factors || [],
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("uplift");
    await db.collection("mood_entries").insertOne(newMoodEntry);

    // Here you could also add logic to update the user's moodStreak in the 'users' collection

    return NextResponse.json({ message: "Mood entry created", entry: newMoodEntry }, { status: 201 });
  } catch (error) {
    console.error("Error creating mood entry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}