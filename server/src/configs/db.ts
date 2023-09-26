import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// dedicated memory server for testing
let mongoMemoryServer: MongoMemoryServer;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI must be defined");
    process.exit(1);
  }

  let dbUrl = process.env.MONGO_URI;

  // if testing, use dedicated memory server
  if(process.env.NODE_ENV === 'test') {
    mongoMemoryServer = await MongoMemoryServer.create();
    dbUrl = mongoMemoryServer.getUri();
  }

  try {
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");

    if(mongoMemoryServer) 
      await mongoMemoryServer.stop();
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
}

export {connectDB, disconnectDB};
