import mongoose from "mongoose";

const { Schema } = mongoose;

const userTypes = ["customer", "seller"];

export const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\../, "Please enter a valid email"],
  },
  password: String,
  type: { type: String, enum: userTypes },
});
