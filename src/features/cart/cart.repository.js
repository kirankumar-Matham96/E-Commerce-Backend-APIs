import { getDB } from "../../config/mongodb.js";
import { ObjectId, ReturnDocument } from "mongodb";
import { ApplicationError } from "../../errorHandler/applicationError.js";

class CartRepository {
  constructor() {
    this.collection = "cart";
  }

  get = async (userId) => {
    try {
      const db = getDB("e-com-db");
      const cartCollection = db.collection(this.collection);
      return await cartCollection
        .find({
          userId: ObjectId.createFromHexString(userId),
        })
        .toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  };

  add = async ({ userId, productId, quantity }) => {
    try {
      const db = getDB("e-com-db");
      const cartCollection = db.collection(this.collection);

      // get id
      const id = await this.getNextCounter(db);

      await cartCollection.updateOne(
        {
          userId: ObjectId.createFromHexString(userId),
          productId: ObjectId.createFromHexString(productId),
        },
        { $setOnInsert: { _id: id }, $inc: { quantity: quantity } },
        { upsert: true }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  };

  remove = async (cartItemId, userId) => {
    try {
      const db = getDB("e-com-db");
      const cartCollection = db.collection(this.collection);
      const result = await cartCollection.deleteOne({
        _id: ObjectId.createFromHexString(cartItemId),
        userId: ObjectId.createFromHexString(userId),
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  };

  getById = async (cartItemId) => {
    try {
      const db = getDB("e-com-db");
      const cartCollection = db.collection(this.collection);
      return await cartCollection.findOne({
        _id: ObjectId.createFromHexString(cartItemId),
      });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  };

  increaseQuantity = async (cartItemId) => {
    try {
      const db = getDB("e-com-db");
      const cartCollection = db.collection(this.collection);

      cartCollection.updateOne(
        {
          _id: ObjectId.createFromHexString(cartItemId),
        },
        { $inc: { quantity: 1 } },
        { upsert: true }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  };

  decreaseQuantity = async (cartItemId) => {
    try {
      const db = getDB("e-com-db");
      const cartCollection = db.collection(this.collection);

      cartCollection.updateOne(
        {
          _id: ObjectId.createFromHexString(cartItemId),
        },
        { $inc: { quantity: -1 } },
        { upsert: true }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  };

  getNextCounter = async (db) => {
    const resultDocument = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { ReturnDocument: "after" }
      );
    return resultDocument.value;
  };
}

export default CartRepository;
