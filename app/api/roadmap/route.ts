import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import LearningPath from "@/app/models/learning-path";

// 🟢 GET Request - Fetch all roadmaps if no email is provided
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const userEmail = url.searchParams.get("email");

    console.log("🔎 GET Request for email:", userEmail || "Fetching all roadmaps");

    let roadmaps;
    if (userEmail) {
      roadmaps = await LearningPath.find({ userEmail });
    } else {
      roadmaps = await LearningPath.find(); // Fetch all roadmaps
    }

    if (!roadmaps.length) {
      console.warn("⚠ No roadmaps found.");
      return NextResponse.json({ message: "No roadmaps found" }, { status: 404 });
    }

    console.log("✅ Roadmaps found:", roadmaps);
    return NextResponse.json({ roadmaps }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching roadmaps:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
