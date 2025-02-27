import mongoose from 'mongoose';

export type Course = {
    platform: string;
    name: string;
    link: string;
    focus: string;
};

export type Project = {
    name: string;
    description: string;
};

export type Step = {
    title: string;
    description: string;
    courses: Course[];
    projects: Project[];
};

export type LearningPhase = {
    timeline: string;
    description: string;
    steps: Step[];
};

export type LearningPath = {
    Beginner: LearningPhase;
    Intermediate: LearningPhase;
    Advanced: LearningPhase;
};

export type RoadmapData = {
    roadmap: {
        user: {
            name: string;
            skills: string[];
            experience: string;
            collegeStudent: boolean;
            dream: string;
            currentRole: string;
            areaOfInterest: string[];
        };
        learning_path: LearningPath;
    }
}

const CourseSchema = new mongoose.Schema({
    platform: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
    focus: { type: String, required: true }
});

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const StepSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    courses: [CourseSchema],
    projects: [ProjectSchema]
});

const LearningPhaseSchema = new mongoose.Schema({
    timeline: { type: String, required: true },
    description: { type: String, required: true },
    steps: [StepSchema]
});

const LearningPathSchema = new mongoose.Schema({
    Beginner: { type: LearningPhaseSchema, required: true },
    Intermediate: { type: LearningPhaseSchema, required: true },
    Advanced: { type: LearningPhaseSchema, required: true }
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skills: [{ type: String, required: true }],
    experience: { type: String, required: true },
    collegeStudent: { type: Boolean, required: true },
    dream: { type: String, required: true },
    currentRole: { type: String, required: true },
    areaOfInterest: [{ type: String, required: true }]
});

const RoadmapSchema = new mongoose.Schema({
    user: { type: UserSchema, required: true },
    learning_path: { type: LearningPathSchema, required: true }
});

const RoadmapModel = mongoose.model('Roadmap', RoadmapSchema);

export default RoadmapModel;