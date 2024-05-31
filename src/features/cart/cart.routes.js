import express from "express";
import CartController from "./cart.controller.js";

const router = express.Router();

const cartController = new CartController();

router.get("/", cartController);
router.post("/", cartController);
router.put("/:id", cartController);
router.delete("/:id", cartController);

export default router;
