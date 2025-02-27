import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/careerpath";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Define a global interface for mongoose connection caching
interface MongooseGlobal {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Extend the global object with the mongoose cache
declare global {
  var mongoose: MongooseGlobal;
}

// Ensure global.mongoose is initialized properly
global.mongoose = global.mongoose || { conn: null, promise: null };

async function dbConnect(): Promise<mongoose.Connection> {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Extract the connection object from the mongoose instance
    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance.connection; // ✅ Extracting the Connection object explicitly
    });
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;
