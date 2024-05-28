// imports
import express from "express";
import ProductController from "./product.controller.js";
import uploadFile from "../../middleware/multer.middleware.js";

// initialize express router
export const router = express.Router();

const productController = new ProductController();

// all the paths to controller methods
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
// router.get("/", productController.rateProduct);
router.post(
  "/add-width-image-file",
  uploadFile.single("imageUrl"),
  productController.addProductWithImageFile
);
router.post("/add-with-image-url", productController.addProductWithImageUrl);
