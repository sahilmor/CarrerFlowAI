import mongoose from "mongoose";

const LearningPathSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // To associate it with the user
  learningPath: { type: Object, required: true }, // Store the roadmap data
});

const LearningPath = mongoose.models.LearningPath || mongoose.model("LearningPath", LearningPathSchema);

export default LearningPath;
