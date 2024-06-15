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
    enum: ["products", "categories"],
  },
})
  .pre("save", (next) => {
    console.log("new like coming in...");

    next();
  })
  .post("save", (doc) => {
    console.log("A new like has been added");
    console.log(doc);
  })
  .pre("find", (next) => {
    console.log("finding...");
    next();
  })
  .post("find", (doc) => {
    console.log("found doc");
    console.log(doc);
  });
