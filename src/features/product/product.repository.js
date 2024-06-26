import mongoose from "mongoose";
import productsSchema from "./products.schema.js";
import reviewSchema from "./review.schema.js";
import categorySchema from "./category.schema.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";
// import { ObjectId } from "mongoose";

const ProductModel = new mongoose.model("products", productsSchema);
const ReviewModel = new mongoose.model("reviews", reviewSchema);
const CategoryModel = new mongoose.model("categories", categorySchema);

class ProductRepository {
  add = async (product) => {
    try {
      // adding/updating the product
      const newProduct = new ProductModel(product);
      await newProduct.save();

      // adding/updating the category
      await CategoryModel.updateMany(
        {
          _id: { $in: product.categories },
        },
        {
          $push: { products: newProduct._id },
        }
      );

      return product;
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      }
      throw new ApplicationError("something went wrong", 500);
    }
  };

  getAll = async () => {
    try {
      return await ProductModel.find();
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      }
      throw new ApplicationError("something went wrong", 500);
    }
  };

  rate = async (userId, productId, rating) => {
    try {
      const productToUpdate = await ProductModel.findById(productId);

      if (!productToUpdate) {
        throw new ApplicationError("product not found", 404);
      }

      const userReview = await ReviewModel.findOne({
        productId: productId,
        userId: userId,
      });

      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newUserReview = new ReviewModel({
          productId: mongoose.Types.ObjectId.createFromHexString(productId),
          userId: mongoose.Types.ObjectId.createFromHexString(userId),
          rating,
        });
        await newUserReview.save();
      }
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      }
      throw new ApplicationError("something went wrong", 500);
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
        .project({ name: 1, price: 1, _id: 0, ratings: { $slice: 1 } })
        .toArray();
      return results;
    } catch (error) {
      console.log(error);
    }
  };

  averageProductPricePerCategory = async () => {
    try {
      const db = getDB("e-com-db");
      const productsCollection = db.collection(this.collection);

      return await productsCollection
        .aggregate([
          {
            $group: {
              _id: "$category",
              averagePrice: {
                $avg: "$price",
              },
            },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("something went wrong", 500);
    }
  };
}

export default ProductRepository;
