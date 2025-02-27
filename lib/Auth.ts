import "dotenv/config";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

/**
 * Generates a JWT token for authentication.
 */
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  }

/**
 * Sets the authentication cookie in the response.
 */
export function setAuthCookie(response: NextResponse, token: string): void {
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  }

  export function clearAuthCookie(response: NextResponse): void {
    response.cookies.set({
      name: "auth_token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // Expire immediately
    });
  }

/**
 * Extracts user ID from JWT token stored in cookies or Authorization header.
 */
export function getUserIdFromRequest(req: Request): string | null {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("auth_token")?.value;
      
      if (!token) return null;
  
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      return decoded.userId;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return null;
    }
  }
