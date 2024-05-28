import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts = (req, res) => {
    const products = ProductModel.getAllProducts();
    res.status(200).send({ message: "Retrieved all the products!", products });
  };

  addProduct = (req, res) => {
    ProductModel.addProduct(req.body);
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
