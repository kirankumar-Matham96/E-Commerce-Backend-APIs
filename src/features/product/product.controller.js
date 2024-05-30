import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts = (req, res) => {
    const products = ProductModel.getAll();
    res.status(200).send({ message: "Retrieved all the products!", products });
  };

  addProductWithImageUrl = (req, res) => {
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
  };

  addProductWithImageFile = (req, res) => {
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
  };

  rateProduct = (req, res) => {
    const { id } = req.params;
    const { userId, rating } = req.query;
    const response = ProductModel.rate(userId, id, rating);
    if (response === "Product not found") {
      return res
        .status(401)
        .json({ status: "failure", error: "Product not found" });
    }

    res.status(200).send({ message: "Rating added successfully!" });
  };

  getOneProduct = (req, res) => {
    const { id } = req.params;
    const product = ProductModel.get(id);
    if (product) {
      return res
        .status(200)
        .send({ message: "Retrieved all the products!", product });
    }
    return res.status(404).send({ message: "Product not found!" });
  };

  filterProducts = (req, res) => {
    const { minPrice, maxPrice, category } = req.query;
    const filteredProducts = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send({ products: filteredProducts });
  };
}
