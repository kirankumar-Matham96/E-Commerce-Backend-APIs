import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";

class ProductRepository {
  constructor() {
    // this.db = getDB("e-com-db");
    // this.productsCollection = db.collection("products");
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

      // find the product
      const productFound = await this.get(productId);

      // find the rating
      const userRatings = productFound?.ratings?.find((rating) => {
        console.log("rating.userId => ", rating.userId);
        console.log("passed userId => ", ObjectId.createFromHexString(userId));
        // return rating.userId == ObjectId.createFromHexString(userId);
        return rating.userId.equals(ObjectId.createFromHexString(userId));
      });

      if (userRatings) {
        // update the rating
        await productsCollection.updateOne(
          {
            _id: ObjectId.createFromHexString(productId),
            "ratings.userId": ObjectId.createFromHexString(userId),
          },
          {
            $set: { "ratings.$.rating": rating },
          }
        );
      } else {
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
      }
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

  filter = async (minPrice, maxPrice, category) => {
    try {
      const filterExpression = {};

      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }

      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }

      if (category) {
        filterExpression.category = category;
      }
      const db = getDB("e-com-db");
      const productsCollection = db.collection(this.collection);
      const results = await productsCollection.find(filterExpression).toArray();
      return results;
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProductRepository;
