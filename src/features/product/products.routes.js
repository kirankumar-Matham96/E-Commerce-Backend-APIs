// imports
import express from "express";
import ProductController from "./product.controller.js";
import uploadFile from "../../middleware/multer.middleware.js";

// initialize express router
const router = express.Router();

const productController = new ProductController();

// all the paths to controller methods
router.get("/", productController.getAllProducts);
router.get("/filter", productController.filterProducts);
router.get("/:id", productController.getOneProduct);
router.post(
  "/add-width-image-file",
  uploadFile.single("imageUrl"),
  productController.addProductWithImageFile
);
router.post("/add-with-image-url", productController.addProductWithImageUrl);

router.put("/:id/rate", productController.rateProduct);

router.get("*", (req, res) => {
  res.status(404).send("Page/Product not found!");
});

export default router;