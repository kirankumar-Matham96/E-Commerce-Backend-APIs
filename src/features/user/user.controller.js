import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";

const saltRounds = 12;
class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  getAllUsers = (req, res, next) => {
    try {
      const users = userRepository.getAll();
      res.status(200).json({ status: "success", users });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };

  getUserById = (req, res) => {
    try {
      const { id } = req.params;
      const user = userRepository.get(id);
      return res.status(200).json({ status: "success", user });
    } catch (error) {
      return res.status(404).send({ status: "failure", error: error.message });
    }
  };

  userSignup = async (req, res, next) => {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new UserModel(name, email, hashedPassword, type);
      const newUser = await this.userRepository.create(user);

      res.status(201).json({
        status: "success",
        message: "User created successfully",
        newUser,
      });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };

  userSignIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userFound = await this.userRepository.login(email);

      if (!userFound) {
        throw new ApplicationError("user not found! please register", 404);
      }

      // compare the password
      const result = await bcrypt.compare(password, userFound.password);
      if (!result) {
        throw new ApplicationError("invalid credentials", 400);
      }

      // creating jwt
      const jwtToken = jwt.sign(
        { id: userFound.id, email: userFound.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        status: "success",
        message: "login success!",
        token: jwtToken,
      });
    } catch (error) {
      console.log("login controller error: ", error);
      return res.status(401).json({ status: "failure", error: error.message });
    }
  };

  userSignOut = (req, res) => {
    // TODO: Need to handle jwt token on sign out
    res.status(200).json({ status: "success", msg: "Logged out!" });
  };
}

export default UserController;
