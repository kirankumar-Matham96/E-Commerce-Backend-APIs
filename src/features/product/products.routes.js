// imports
import express from "express";
import ProductController from "./product.controller.js";
import uploadFile from "../../middleware/multer.middleware.js";

// initialize express router
const router = express.Router();

const productController = new ProductController();

// all the paths to controller methods
router.get("/", (req, res, next) =>
  productController.getAllProducts(req, res, next)
);
router.get("/filter", (req, res, next) =>
  productController.filterProducts(req, res, next)
);
router.get("/:id", (req, res, next) =>
  productController.getOneProduct(req, res, next)
);
router.post(
  "/add-width-image-file",
  uploadFile.single("imageUrl"),
  (req, res, next) => productController.addProductWithImageFile(req, res, next)
);
// router.post("/add-with-image-url", (req, res) =>
//   productController.addProductWithImageUrl(req, res)
// );

router.put("/rate", (req, res, next) =>
  productController.rateProduct(req, res, next)
);

router.get("*", (req, res) => {
  res.status(404).send("API Not Found");
});

export default router;
