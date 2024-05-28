import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts = (req, res) => {
    const products = ProductModel.getAllProducts();
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

    ProductModel.addProduct(product);
    res.status(201).send({ message: "Product added successfully!" });
  };

  addProductWithImageFile = (req, res) => {
    const { name, description, quantity, category, price, sizes, rating } =
      req.body;

    console.log("file name in controller => ", req.file.filename);
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
    ProductModel.addProduct(product);
    res.status(201).send({ message: "Product added successfully!" });
  };

  rateProduct = (req, res) => {
    const { id } = req.params;
    ProductModel.rateProduct(id, req.body.rating);
    res.status(200).send({ message: "Rating added successfully!" });
  };

  getOneProduct = (req, res) => {
    const { id } = req.params;
    const product = ProductModel.getProduct(id);
    if (product) {
      return res
        .status(200)
        .send({ message: "Retrieved all the products!", product });
    }
    return res.status(404).send({ message: "Product not found!" });
  };
}
