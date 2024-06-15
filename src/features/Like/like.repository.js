import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ApplicationError } from "../../middleware/customErrorHandling.middleware.js";

export const likeModel = new mongoose.model("likes", likeSchema);

class LikeRepository {
  likeProduct = async (userId, productId) => {
    try {
      // if like exists?
      // ????

      // if new like
      const newLike = new likeModel({
        user: userId,
        likeable: productId,
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
      // if like exists?
      // ????

      // if new like
      const newLike = new likeModel({
        user: userId,
        likeable: categoryId,
        paths: "categories",
      });

      await newLike.save();
    } catch (error) {
      console.log(error);
    }
  };

  getAllLikes = async (userId) => {
    try {
      const userLikes = await likeModel
        .find({
          user: userId,
        })
        .populate("user");

      return userLikes;
    } catch (error) {
      console.log(error);
    }
  };

  getTypeLikes = async (likeableId, type) => {
    try {
      const userLikes = await likeModel
        .find({
          likeable: likeableId,
          paths: type,
        })
        .populate("user")
        .populate({
          // specific id
          path: "likeable",
          // specific collection
          model: type,
        });

      console.log({ userLikes });
      return userLikes;
    } catch (error) {
      console.log(error);
    }
  };
}

export default LikeRepository;
