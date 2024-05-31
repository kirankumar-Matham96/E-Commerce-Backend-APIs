import express from "express";
import UserController from "./user.controller.js";
import ValidateUser from "../../middleware/userValidation.middleware.js";

const router = express.Router();

const userController = new UserController();
const validateUser = new ValidateUser();

router.get("/", userController.getAllUsers);
router.post(
  "/login",
  validateUser.validateUserSignIn,
  userController.userSignIn
);

router.get("/logout", userController.userSignOut);

router.post(
  "/register",
  validateUser.validateUserSignUp,
  userController.userSignup
);
router.get("/:id", userController.getUserById);
// router.put("/", userController.updateUser);

export default router;
