import { v4 as uuidv4 } from "uuid";
import {ApplicationError} from "../../errorHandler/applicationError.js";

const products = [
  {
    id: uuidv4(),
    name: "Leather Jacket",
    price: 199.99,
    quantity: 20,
    description: "Comfortable leather jacket for riders",
    imageUrl: "https://m.media-amazon.com/images/I/619KZMkHQBL._SX679_.jpg",
    category: "clothes",
    sizes: "xs,s,m,l,xl,xxl,xxxl",
    rating: [],
  },
  {
    id: uuidv4(),
    name: "Leather Jacket",
    price: 249.99,
    quantity: 20,
    description: "Comfortable leather jacket for riders",
    imageUrl: "https://m.media-amazon.com/images/I/619KZMkHQBL._SX679_.jpg",
    category: "clothes",
    sizes: "xs,s,m,l,xl,xxl,xxxl",
    rating: [],
  },
  {
    id: uuidv4(),
    name: "Leather Jacket",
    price: 601.29,
    quantity: 20,
    description: "Comfortable leather jacket for riders",
    imageUrl: "https://m.media-amazon.com/images/I/619KZMkHQBL._SX679_.jpg",
    category: "clothes",
    sizes: "xs,s,m,l,xl,xxl,xxxl",
    rating: [],
  },
  {
    id: uuidv4(),
    name: "Leather Jacket",
    price: 499.59,
    quantity: 20,
    description: "Comfortable leather jacket for riders",
    imageUrl: "https://m.media-amazon.com/images/I/619KZMkHQBL._SX679_.jpg",
    category: "footwear",
    sizes: "xs,s,m,l,xl,xxl,xxxl",
    rating: [],
  },
  {
    id: uuidv4(),
    name: "Leather Jacket",
    price: 399.59,
    quantity: 20,
    description: "Comfortable leather jacket for riders",
    imageUrl: "https://m.media-amazon.com/images/I/619KZMkHQBL._SX679_.jpg",
    category: "footwear",
    sizes: "xs,s,m,l,xl,xxl,xxxl",
    rating: [],
  },
];

class ProductModel {
  constructor(
    name,
    description,
    quantity,
    imageUrl,
    category,
    price,
    sizes,
    rating = []
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

  static add = (product) => {
    const newProduct = new ProductModel(
      product.name,
      product.description,
      product.quantity,
      product.imageUrl,
      product.category,
      product.price,
      product.sizes,
      product.rating
    );
    products.push(newProduct);
  };

  static getAll = () => {
    return products;
  };

  static rate = (userId, productId, rating) => {
    if (!userId) {
      throw new ApplicationError("user id not provided", 400);
    }

    if (!productId) {
      throw new ApplicationError("product id not provided", 400);
    }

    if (!rating) {
      throw new ApplicationError("rating not provided", 400);
    }

    const productFound = products.find((p) => p.id === productId);
    if (!productFound) {
      throw new ApplicationError("Product not found",404);
    }

    // if the user rated the product already and now want to update/modify rating
    const foundRating = productFound.rating.find(
      (rating) => rating.userId === userId
    );
    if (foundRating) {
      // updating the rating
      foundRating.rating = rating;
    } else {
      // adding rating for the first time
      productFound.rating.push({ userId, rating });
    }
  };

  static get = (id) => {
    const productFound = products.find((p) => p.id === id);
    if (!productFound) {
      throw new ApplicationError("product not found", 404);
    }
    return productFound;
  };

  static filter = (minPrice, maxPrice, category) => {
    const result = products.filter((product) => {
      if (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category === category)
      ) {
        return product;
      }
    });
    return result;
  };
}

export default ProductModel;
