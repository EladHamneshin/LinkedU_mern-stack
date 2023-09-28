import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// dedicated memory server for testing
let mongoMemoryServer: MongoMemoryServer;

const connectDB = async () => { 
  let dbUri = '';

  if (!process.env.MONGO_URI || !process.env.ATLAS_URI) {
    console.error("db uri must be defined");
    process.exit(1);
  }

  switch (process.env.NODE_ENV) {
    case "production":
      console.log("Connecting to MongoDB Atlas");
      dbUri = process.env.MONGO_URI;
      break;
    case "development":
      console.log("Connecting to MongoDB Atlas");
      dbUri = process.env.ATLAS_URI;
      break;
    case "test":
      console.log("Connecting to MongoDB Memory Server");
      mongoMemoryServer = await MongoMemoryServer.create();
      dbUri = mongoMemoryServer.getUri();
      break;
    default:
      console.error("NODE_ENV must be defined");
      process.exit(1);
  }


  try {
    const conn = await mongoose.connect(dbUri);
    console.log(`DB Connected: ${conn.connection.host}`);
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
      await mongoMemoryServer.stop({ doCleanup: true });
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
}

export {connectDB, disconnectDB};
