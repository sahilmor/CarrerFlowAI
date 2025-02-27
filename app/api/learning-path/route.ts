import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import LearningPath from '@/app/models/LearningPath';
import { getUserIdFromRequest } from '@/lib/Auth';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    const { learning_path } = body;
    
    if (!learning_path || !learning_path.Beginner || !learning_path.Intermediate || !learning_path.Advanced) {
      return NextResponse.json(
        { success: false, message: 'Invalid learning path data' },
        { status: 400 }
      );
    }
    
    
    const existingPath = await LearningPath.findOne({ userId });
    
    let learningPath;
    
    if (existingPath) {
      
      learningPath = await LearningPath.findOneAndUpdate(
        { userId },
        {
          beginner: {
            timeline: learning_path.Beginner.timeline,
            description: learning_path.Beginner.description,
            steps: learning_path.Beginner.steps,
          },
          intermediate: {
            timeline: learning_path.Intermediate.timeline,
            description: learning_path.Intermediate.description,
            steps: learning_path.Intermediate.steps,
          },
          advanced: {
            timeline: learning_path.Advanced.timeline,
            description: learning_path.Advanced.description,
            steps: learning_path.Advanced.steps,
          },
        },
        { new: true }
      );
    } else {
      
      learningPath = await LearningPath.create({
        userId,
        beginner: {
          timeline: learning_path.Beginner.timeline,
          description: learning_path.Beginner.description,
          steps: learning_path.Beginner.steps,
        },
        intermediate: {
          timeline: learning_path.Intermediate.timeline,
          description: learning_path.Intermediate.description,
          steps: learning_path.Intermediate.steps,
        },
        advanced: {
          timeline: learning_path.Advanced.timeline,
          description: learning_path.Advanced.description,
          steps: learning_path.Advanced.steps,
        },
      });
    }
    
    return NextResponse.json({
      success: true,
      learningPath,
    });
  } catch (error) {
    console.error('Create learning path error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

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
    
    const learningPath = await LearningPath.findOne({ userId });
    
    if (!learningPath) {
      return NextResponse.json(
        { success: false, message: 'Learning path not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      learningPath: {
        Beginner: {
          timeline: learningPath.beginner.timeline,
          description: learningPath.beginner.description,
          steps: learningPath.beginner.steps,
        },
        Intermediate: {
          timeline: learningPath.intermediate.timeline,
          description: learningPath.intermediate.description,
          steps: learningPath.intermediate.steps,
        },
        Advanced: {
          timeline: learningPath.advanced.timeline,
          description: learningPath.advanced.description,
          steps: learningPath.advanced.steps,
        },
      },
    });
  } catch (error) {
    console.error('Get learning path error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}