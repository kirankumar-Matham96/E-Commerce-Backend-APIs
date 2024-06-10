import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  add = async (product) => {
    try {
      const db = getDB("e-com-db");
      const productsCollection = db.collection(this.collection);
      await productsCollection.insertOne(product);
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  getAll = async () => {
    try {
      const db = getDB("e-com-db");
      const productsCollection = db.collection(this.collection);
      const productsCursor = await productsCollection.find();
      return productsCursor.toArray();
    } catch (error) {
      console.log(error);
    }
  };

  rate = async (userId, productId, rating) => {
    try {
      const db = getDB("e-com-db");
      const productsCollection = db.collection(this.collection);

      // remove existing rating of a user
      await productsCollection.updateOne(
        { _id: ObjectId.createFromHexString(productId) },
        { $pull: { ratings: { userId: ObjectId.createFromHexString(userId) } } }
      );

      // add rating
      await productsCollection.updateOne(
        {
          _id: ObjectId.createFromHexString(productId),
        },
        {
          $push: {
            ratings: { userId: ObjectId.createFromHexString(userId), rating },
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  get = async (id) => {
    try {
      const db = getDB("e-com-db");
      const productsCollection = db.collection(this.collection);
      const productFound = await productsCollection.findOne({
        // _id: new ObjectId(id) // <--- deprecated
        _id: ObjectId.createFromHexString(id),
      });
      if (!productFound) {
        throw new ApplicationError("product not found", 404);
      }
      return productFound;
    } catch (error) {
      console.log(error);
    }
  };

  filter = async (minPrice, maxPrice, categories) => {
    try {
      let filterExpression = {};

      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }

      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }

      if (categories) {
        filterExpression = {
          // $and: [filterExpression, { category: { $in: [...categories] } }],
          $or: [filterExpression, { category: { $in: [...categories] } }],
        };
      }
      const db = getDB("e-com-db");
      const productsCollection = db.collection(this.collection);
      const results = await productsCollection
        .find(filterExpression)
        .project({ name: 1, price: 1, _id: 0 })
        .toArray();
      return results;
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProductRepository;
