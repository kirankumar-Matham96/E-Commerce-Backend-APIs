import mongoose from "mongoose";
import categorySchema from "../features/product/category.schema.js";

const url = process.env.DB_URL;

const connectToDBUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database using Mongoose...");
    addCategories();
  } catch (error) {
    console.log(error);
  }
};

const addCategories = async () => {
  const categoryModel = new mongoose.model("categories", categorySchema);
  const categories = await categoryModel.find();

  if (!categories || categories.length == 0) {
    await categoryModel.insertMany([
      { name: "engineering" },
      { name: "electronics" },
      { name: "tech" },
    ]);
  }
};

export default connectToDBUsingMongoose;
