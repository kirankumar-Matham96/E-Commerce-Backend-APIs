import express from "express";
import UserController from "./user.controller.js";
import ValidateUser from "../../middleware/userValidation.middleware.js";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";

const router = express.Router();

const userController = new UserController();
const validateUser = new ValidateUser();

router.get("/", (req, res) => userController.getAllUsers(req, res));
router.post("/login", validateUser.validateUserSignIn, (req, res) =>
  userController.userSignIn(req, res)
);

router.get("/logout", (req, res) => userController.userSignOut(req, res));

router.post("/register", validateUser.validateUserSignUp, (req, res, next) =>
  userController.userSignup(req, res, next)
);
router.get("/:id", (req, res) => userController.getUserById(req, res));
router.put("/reset-password", jwtAuth, (req, res) =>
  userController.resetPassword(req, res)
);

export default router;
