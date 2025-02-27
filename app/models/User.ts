import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  skills: string[];
  experience: string;
  collegeStudent: boolean;
  dream: string;
  currentRole: string;
  areaOfInterest: string[];
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false,
      },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    collegeStudent: {
      type: Boolean,
      default: false,
    },
    dream: {
      type: String,
      default: '',
    },
    currentRole: {
      type: String,
      default: '',
    },
    areaOfInterest: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
  
    // Ensure `this.password` is a string before hashing
    if (typeof this.password === "string") {
      this.password = await bcrypt.hash(this.password, salt);
    }
  
    next();
  });

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Prevent mongoose from creating the model multiple times during hot reloads
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);