import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  // addProductWithImageUrl = (req, res) => {
  //   try {
  //     const {
  //       name,
  //       description,
  //       quantity,
  //       imageUrl,
  //       category,
  //       price,
  //       sizes,
  //       rating,
  //     } = req.body;

  //     const product = {
  //       name: req.body.name,
  //       description: req.body.description,
  //       quantity: req.body.quantity,
  //       imageUrl: req.body.imageUrl,
  //       category: req.body.category,
  //       price: req.body.price,
  //       sizes: req.body.sizes.split(","),
  //       rating: req.body.rating,
  //     };

  //     ProductModel.add(product);
  //     res.status(201).send({ message: "Product added successfully!" });
  //   } catch (error) {
  //     console.log(error);
  //     // passing the error to error handling middleware
  //     next(error);
  //   }
  // };

  addProductWithImageFile = async (req, res, next) => {
    try {
      const { name, description, quantity, price, rating } = req.body;
      const imageUrl = req.file.filename;
      const category = req.body.category.split(",").map((category) => category.trim());
      const sizes = req.body.sizes.split(",");

      const newProduct = new ProductModel(
        name,
        description,
        quantity,
        imageUrl,
        category,
        price,
        sizes
      );

      const product = await this.productRepository.add(newProduct);

      res.status(201).send({
        status: "success",
        message: "Product added successfully!",
        products: product,
      });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productRepository.getAll();
      res
        .status(200)
        .send({ message: "Retrieved all the products!", products });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };

  getOneProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.productRepository.get(id);
      res.status(200).send({
        status: "success",
        message: "Retrieved the product!",
        product,
      });
    } catch (error) {
      res.status(404).send({ status: "failure", error: error.message });
    }
  };

  rateProduct = async (req, res) => {
    try {
      const { productId, rating } = req.body;
      const { userId } = req;

      if (!productId) {
        throw new ApplicationError("product id not provided", 400);
      }

      if (!rating) {
        throw new ApplicationError("rating not provided", 400);
      }

      await this.productRepository.rate(userId, productId, rating);

      res.status(200).send({ message: "Rating added successfully!" });
    } catch (error) {
      res.status(401).json({ status: "failure", error: error.message });
    }
  };

  filterProducts = async (req, res) => {
    try {
      const { minPrice, maxPrice, category } = req.query;

      // converting string into array
      const categories = JSON.parse(category.replace(/'/g, '"'));
      const filteredProducts = await this.productRepository.filter(
        minPrice,
        maxPrice,
        categories
      );
      res.status(200).send({ products: filteredProducts });
    } catch (error) {
      console.log(error);
      // passing the error to error handling middleware
      next(error);
    }
  };

  averagePrice = async (req, res) => {
    try {
      const avgProductsList =
        await this.productRepository.averageProductPricePerCategory();
      res.status(200).send({ status: "success", avgProductsList });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: "failure", error: "something went wrong" });
    }
  };
}
