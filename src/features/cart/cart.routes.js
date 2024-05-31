import express from "express";
import CartController from "./cart.controller.js";

const router = express.Router();

const cartController = new CartController();

router.get("/", cartController.getCartItems);
router.post("/:id", cartController.addItemToCart);
router.delete("/:id", cartController.removeItemFromCart);

export default router;
