import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";

const UserModel = mongoose.model("users", userSchema);

class UserRepository {
  create = async (user) => {
    try { 
      const newUser = new UserModel(user);
      await newUser.save();
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw error;
      }
      throw new ApplicationError("something went wrong with database", 500);
    }
  };

  login = async (email) => {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("something went wrong with database", 500);
    }
  };

  resetPass = async (userId, newPass) => {
    try {
      let user = await UserModel.findById(userId);
      if (!user) {
        throw new ApplicationError("user not found", 404);
      }
      user.password = newPass;
      await user.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("something went wrong with database", 500);
    }
  };
}

export default UserRepository;
