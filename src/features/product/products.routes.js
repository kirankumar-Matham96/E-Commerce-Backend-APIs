// imports 
import express from "express";
import ProductController from "./product.controller.js";

// initialize express router
export const router = express.Router();

const productController = new ProductController();

// all the paths to controller methods
router.get("/", productController.getAllProducts);
// router.get("/", productController.getOneProduct);
// router.get("/", productController.rateProduct);
router.post("/", productController.addProduct);
