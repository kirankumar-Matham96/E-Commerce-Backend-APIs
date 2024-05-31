import { v4 as uuidv4 } from "uuid";

const products = [];

class CartModel {
  constructor(userId, productId, quantity) {
    this.id = uuidv4();
    this.productId = productId;
    this.userId = userId;
    this.quantity = parseInt(quantity);
  }

  static get = (userId) => {
    const userCartItems = products.filter((item) => item.userId === userId);
    return userCartItems;
  };

  static add = (userId, productId, quantity) => {
    const userItems = this.get(userId);
    console.log({ userItems });
    if (userItems.length > 0) {
      const productFound = userItems.find((item) => {
        if (item.productId === productId) {
          return item;
        }
      });
      console.log({ productFound });

      if (productFound.productId === productId) {
        // increase quantity
        productFound.quantity += parseInt(quantity);
        return productFound;
      }
    }

    const newProduct = new CartModel(userId, productId, quantity);
    products.push(newProduct);
    return newProduct;
  };

  static remove = (productId) => {
    const foundProductIndex = products.findIndex(
      (item) => item.productId === productId
    );
    if (foundProductIndex == -1) {
      return "Product not found";
    }
    products.splice(foundProductIndex, 1);
  };
}

export default CartModel;
