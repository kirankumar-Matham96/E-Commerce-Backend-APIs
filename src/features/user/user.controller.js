import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

class UserController {
  getAllUsers = (req, res) => {
    const users = UserModel.getAll();
    res.status(200).json({ status: "success", users });
  };

  getUserById = (req, res) => {
    const { id } = req.params;
    const user = UserModel.get(id);
    if (user) {
      return res.status(200).json({ status: "success", user });
    }

    return res.status(404).send({ status: "failure", error: "User not found" });
  };

  userSignup = (req, res) => {
    UserModel.create(req.body);
    res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  };

  userSignIn = (req, res) => {
    const userFound = UserModel.login(req.body);
    if (userFound && userFound.password === req.body.password) {
      // creating jwt
      const jwtToken = jwt.sign(
        { id: userFound.id, email: userFound.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      // storing the token in cookies
      res.cookie("jwtToken", jwtToken, {
        maxAge: 1000 * 60 * 60,
      });
      return res.status(200).json({
        status: "success",
        message: "login success!",
        token: jwtToken,
      });
    }
    return res
      .status(401)
      .json({ status: "failure", error: "Invalid credentials" });
  };

  userSignOut = (req, res) => {
    // clearing the cookies
    res.clearCookie("jwtToken");
    res.status(200).json({ status: "success", msg: "Logged out!" });
  };
}

export default UserController;