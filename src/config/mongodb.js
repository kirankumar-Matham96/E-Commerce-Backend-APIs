// imports
import { MongoClient } from "mongodb";

// setting the mongodb database url
const url = "mongodb://localhost:27017";

let clientInstance;
const connectToMongoDB = async () => {
  try {
    clientInstance = await MongoClient.connect(url);
    console.log("MongoDB is connected...");
  } catch (error) {
    console.log("DB error: ", error);
  }
};

export const getDB = (dbName) => clientInstance.db(dbName);

export default connectToMongoDB;
