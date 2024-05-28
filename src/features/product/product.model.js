import { v4 as uuidv4 } from "uuid";

const products = [];

class ProductModel {
  constructor(
    name,
    description,
    quantity,
    imageUrl,
    category,
    price,
    sizes,
    rating
  ) {
    this.id = uuidv4();
    this.name = name;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.rating = rating;
    this.description = description;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static addProduct = (productData) => {
    console.log({ productData });
    const {
      name,
      description,
      quantity,
      imageUrl,
      category,
      price,
      sizes,
      rating,
    } = productData;
    const newProduct = new ProductModel(
      name,
      description,
      quantity,
      imageUrl,
      category,
      price,
      sizes,
      rating
    );
    products.push(newProduct);
  };

  static getAllProducts = () => {
    return products;
  };

  static rateProduct = (id, rating) => {
    const productFound = products.find((p) => p.id === id);
    productFound.rating = rating;
  };

  static getProduct = (id) => {
    const productFound = products.find((p) => p.id === id);
    return productFound;
  };
}

export default ProductModel;
