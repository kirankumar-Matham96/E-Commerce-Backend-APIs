import mongoose from "mongoose";

// const { Schema, ObjectId } = mongoose;
const { Schema } = mongoose;

export const cartSchema = new Schema({
  // productId: { type: ObjectId },
  productId: { type: Schema.Types.ObjectId, ref: "product" },
  userId: {type: Schema.Types.ObjectId, ref: "user"},
  quantity: Number,
});
