import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { dbName: "testingDb" });
};
