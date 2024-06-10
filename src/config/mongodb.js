// module imports
import { MongoClient, ObjectId } from "mongodb";

// setting the mongodb database url
const url = process.env.DB_URL;

let clientInstance;
const connectToMongoDB = async () => {
  try {
    clientInstance = await MongoClient.connect(url);
    console.log("MongoDB is connected...");
    await createCounter(getDB("e-com-db"));
    await createIndices(getDB("e-com-db"));
  } catch (error) {
    console.log("DB error: ", error);
  }
};

export const getDB = (dbName) => clientInstance.db(dbName);

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  console.log({ existingCounter });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndices = async (db) => {
  try {
    // price index created (Single index)
    await db.collection("products").createIndex({ price: 1 });

    // name and category indices created (Compound index)
    await db.collection("products").createIndex({
      name: 1,
      category: -1,
    });

    // text based description index created (text index)
    await db.collection("products").createIndex({ description: "text" });
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongoDB;
