import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  rating: Number,
});

export default reviewSchema;
