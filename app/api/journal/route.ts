import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("uplift");
    const journalEntries = await db
      .collection("journal")
      .find({ userId })
      .toArray();

    return NextResponse.json(journalEntries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
