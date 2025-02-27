import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/app/models/User";  // Ensure the path to the User model is correct

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, password } = body;

    
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    
    const user = await User.create({ name, email, password });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
