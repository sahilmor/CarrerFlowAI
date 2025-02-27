import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/app/models/User';
import { getUserIdFromRequest } from '@/lib/Auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        experience: user.experience,
        collegeStudent: user.collegeStudent,
        dream: user.dream,
        currentRole: user.currentRole,
        areaOfInterest: user.areaOfInterest,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}