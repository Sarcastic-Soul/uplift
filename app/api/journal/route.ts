import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET handler remains the same
export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("uplift");
    const journalEntries = await db
      .collection("journal_entries")
      .find({ userId })
      .sort({ createdAt: -1 }) // Sort by creation date descending
      .toArray();

    return NextResponse.json(journalEntries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST handler to create a new journal entry
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, content, tags } = await req.json();

    if (!title || !content) {
      return new NextResponse("Missing title or content", { status: 400 });
    }

    const newJournalEntry = {
      userId,
      title,
      content,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("uplift");
    await db.collection("journal_entries").insertOne(newJournalEntry);

    // Here you could also add logic to update the user's journalStreak in the 'users' collection

    return NextResponse.json(
      { message: "Journal entry created", entry: newJournalEntry },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
