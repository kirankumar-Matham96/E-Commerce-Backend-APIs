// name
// products

import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

export default categorySchema;
