import mongoose from "mongoose";

const { Schema } = mongoose;

export const productSizes = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"];
const productsSchema = new Schema({
  name: String,
  quantity: Number,
  imageUrl: String,
  ratings: Object,
  description: String,
  price: Number,
  // sizes: { type: String, enum: productSizes },
  sizes: { type: Object, enum: productSizes },
  stock: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
});

export default productsSchema;
