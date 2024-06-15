import mongoose from "mongoose";
import { likeSchema } from "./like.schema";
import { ApplicationError } from "../../middleware/customErrorHandling.middleware";

export const likeModel = mongoose.model("likes", likeSchema);

class LikeRepository {
  likeProduct = async (userId, productId) => {
    try {
      const newLike = new likeModel({
        user: mongoose.Types.ObjectId(userId),
        likeable: mongoose.Types.ObjectId(productId),
        paths: "products",
      });

      await newLike.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("something went wrong", 500);
    }
  };

  likeCategory = async (userId, categoryId) => {
    try {
      const newLike = new likeModel({
        user: mongoose.Types.ObjectId(userId),
        likeable: mongoose.Types.ObjectId(categoryId),
        paths: "categories",
      });

      await newLike.save();
    } catch (error) {
      console.log(error);
    }
  };
}

export default LikeRepository;
