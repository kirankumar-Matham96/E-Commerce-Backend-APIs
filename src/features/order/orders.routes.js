import express from "express";
import OrderController from "./orders.controller.js";

const router = express.Router();
const orderController = new OrderController();

router.post("/", (req, res) => orderController.confirmOrder(req, res));
router.post("/cancel", (req, res) => orderController.cancelOrder(req, res));
router.get("/", (req, res) => orderController.getOrders(req, res));
router.get("/:id", (req, res) => orderController.getOrderById(req, res));

export default router;
