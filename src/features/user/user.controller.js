import UserModel from "./user.model.js";

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
    res.status(201).json({ status: "success", message: "User created successfully" });
  };

  // updateUser = (req, res) => {
  //   const { id } = req.params;
  //   UserModel.update(id, req.body);
  // };

  userSignIn = (req, res) => {
    const userFound = UserModel.login(req.body);
    if (userFound && userFound.password === req.body.password) {
      return res.status(200).json({ status: "success", message: "login success!" });
    }
    return res.status(401).json({ status: "failure", error: "Invalid credentials" });
  };
}

export default UserController;
