import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts = (req, res) => {
    try {
      const products = ProductModel.getAll();
      res
        .status(200)
        .send({ message: "Retrieved all the products!", products });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };

  addProductWithImageUrl = (req, res) => {
    try {
      const {
        name,
        description,
        quantity,
        imageUrl,
        category,
        price,
        sizes,
        rating,
      } = req.body;

      const product = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        price: req.body.price,
        sizes: req.body.sizes.split(","),
        rating: req.body.rating,
      };

      ProductModel.add(product);
      res.status(201).send({ message: "Product added successfully!" });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };

  addProductWithImageFile = (req, res) => {
    try {
      const { name, description, quantity, category, price, sizes, rating } =
        req.body;

      const product = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        imageUrl: req.file.filename,
        category: req.body.category,
        price: req.body.price,
        sizes: req.body.sizes.split(","),
        rating: req.body.rating,
      };
      ProductModel.add(product);
      res.status(201).send({ message: "Product added successfully!" });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };

  rateProduct = (req, res) => {
    try {
      const { id } = req.params;
      const { userId, rating } = req.query;
      ProductModel.rate(userId, id, rating);
      res.status(200).send({ message: "Rating added successfully!" });
    } catch (error) {
      res.status(401).json({ status: "failure", error: error.message });
    }
  };

  getOneProduct = (req, res) => {
    try {
      const { id } = req.params;
      const product = ProductModel.get(id);
      res.status(200).send({
        status: "success",
        message: "Retrieved the product!",
        product,
      });
    } catch (error) {
      res.status(404).send({ status: "failure", error: error.message });
    }
  };

  filterProducts = (req, res) => {
    try {
      const { minPrice, maxPrice, category } = req.query;
      const filteredProducts = ProductModel.filter(
        minPrice,
        maxPrice,
        category
      );
      res.status(200).send({ products: filteredProducts });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };
}
