import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import e from "express";

class UserController {
  getAllUsers = (req, res) => {
    const users = UserModel.getAll();
    res.status(200).json({ status: "success", users });
  };

  getUserById = (req, res) => {
    try {
      const { id } = req.params;
      const user = UserModel.get(id);
      return res.status(200).json({ status: "success", user });
    } catch (error) {
      return res.status(404).send({ status: "failure", error: error.message });
    }
  };

  userSignup = (req, res) => {
    UserModel.create(req.body);
    res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  };

  userSignIn = (req, res) => {
    try {
      const userFound = UserModel.login(req.body);

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
      return res.status(401).json({ status: "failure", error: error.message });
    }
  };

  userSignOut = (req, res) => {
    // TODO: Need to handle jwt token on sign out
    res.status(200).json({ status: "success", msg: "Logged out!" });
  };
}

export default UserController;
