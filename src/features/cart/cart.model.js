import { v4 as uuidv4 } from "uuid";

const cartItems = [];

class CartModel {
  constructor(userId, productId, quantity) {
    this.id = uuidv4();
    this.productId = productId;
    this.userId = userId;
    this.quantity = parseInt(quantity);
  }

  static get = (userId) => {
    const userCartItems = cartItems.filter((item) => item.userId === userId);
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
    cartItems.push(newProduct);
    return newProduct;
  };

  static remove = (cartItemId) => {
    const foundCartItemIndex = cartItems.findIndex(
      (item) => item.id === cartItemId
    );
    if (foundCartItemIndex == -1) {
      return "Product not found";
    }
    cartItems.splice(foundCartItemIndex, 1);
  };
}

export default CartModel;
