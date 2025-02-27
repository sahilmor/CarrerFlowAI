import mongoose, { Schema, Document } from 'mongoose';

// Course Schema
interface ICourse {
  platform: string;
  name: string;
  link: string;
  focus: string;
}

const CourseSchema = new Schema<ICourse>({
  platform: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  focus: {
    type: String,
    required: true,
  },
});

// Project Schema
interface IProject {
  name: string;
  description: string;
}

const ProjectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Step Schema
interface IStep {
  title: string;
  description: string;
  courses: ICourse[];
  projects: IProject[];
}

const StepSchema = new Schema<IStep>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courses: [CourseSchema],
  projects: [ProjectSchema],
});

// Learning Phase Schema
interface ILearningPhase {
  timeline: string;
  description: string;
  steps: IStep[];
}

const LearningPhaseSchema = new Schema<ILearningPhase>({
  timeline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  steps: [StepSchema],
});

// Learning Path Schema
export interface ILearningPath extends Document {
  userId: mongoose.Types.ObjectId;
  beginner: ILearningPhase;
  intermediate: ILearningPhase;
  advanced: ILearningPhase;
}

const LearningPathSchema = new Schema<ILearningPath>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    beginner: {
      type: LearningPhaseSchema,
      required: true,
    },
    intermediate: {
      type: LearningPhaseSchema,
      required: true,
    },
    advanced: {
      type: LearningPhaseSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.LearningPath || mongoose.model<ILearningPath>('LearningPath', LearningPathSchema);