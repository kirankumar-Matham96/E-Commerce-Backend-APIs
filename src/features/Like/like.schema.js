import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "paths",
  },
  paths: {
    type: String,
    enum: ["products, categories"]
  },
});
