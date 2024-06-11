import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./orders.model.js";

class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  placeOrder = async (userId) => {
    // importing mongodb client
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDB("e-com-db");

      session.startTransaction();

      // get the cart items and calculate total amount
      const cartItems = await this.getTotalAmount(userId, session);
      const totalOrderAmount = cartItems.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );

      //  Create an order record
      const newOrder = new OrderModel(
        ObjectId.createFromHexString(userId),
        totalOrderAmount,
        new Date()
      );

      const orderCollection = db.collection(this.collection);
      await orderCollection.insertOne(newOrder, { session });

      // reduce the stock in the products collection
      cartItems.forEach(async (item) => {
        await db.collection("products").updateOne(
          {
            _id: item.productId,
          },
          {
            $inc: { stock: -item.quantity },
          },
          { session }
        );
      });

      // throw new Error("Intentional error", 500);

      // clear the cart
      await db
        .collection("cart")
        .deleteMany(
          { userId: ObjectId.createFromHexString(userId) },
          { session }
        );

      // committing the transaction (completing the operations in the session before closing)
      await session.commitTransaction();

      // ending the session
      session.endSession();
      return totalOrderAmount;
    } catch (error) {
      // if there are any open session transactions, they will be closed.
      await session.abortTransaction();
      // closing the session on error
      session.endSession();
      console.log(error);
    }
  };

  getTotalAmount = async (userId, session) => {
    const db = getDB("e-com-db");
    const cartCollection = db.collection("cart");
    const cartItems = await cartCollection
      .aggregate(
        [
          // get cart items of a user
          {
            $match: {
              userId: ObjectId.createFromHexString(userId),
            },
          },
          // get the products from the products collection
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          // unwinding the product info
          {
            $unwind: "$productInfo",
          },
          // calculate total amount for each cart item
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();

    return cartItems;
  };

  cancel = async () => {
    try {
      const db = getDB("e-com-db");
      const orderCollection = db.collection(this.collection);
      // orderCollection.();
      return "";
    } catch (error) {
      console.log(error);
    }
  };

  getAll = async () => {
    try {
      const db = getDB("e-com-db");
      const orderCollection = db.collection(this.collection);
      // orderCollection.();
      return "";
    } catch (error) {
      console.log(error);
    }
  };

  get = async () => {
    try {
      const db = getDB("e-com-db");
      const orderCollection = db.collection(this.collection);
      // orderCollection.();
      return "";
    } catch (error) {
      console.log(error);
    }
  };
}

export default OrderRepository;
