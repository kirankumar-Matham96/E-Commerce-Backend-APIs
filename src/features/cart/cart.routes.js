import express from "express";
import CartController from "./cart.controller.js";

const router = express.Router();

const cartController = new CartController();

router.get("/", (req, res) => cartController.getCartItems(req, res));
router.get("/:id", (req, res) => cartController.getCartItemById(req, res));
router.post("/", (req, res) => cartController.addItemToCart(req, res));
router.delete("/:id", (req, res) =>
  cartController.removeItemFromCart(req, res)
);
router.put("/:id/increase", (req, res) =>
  cartController.increaseCartItemQuantity(req, res)
);
router.put("/:id/decrease", (req, res) =>
  cartController.decreaseCartItemQuantity(req, res)
);

export default router;
