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

    // if product exists in the user cart already
    if (userItems.length > 0) {
      // checking if product available already
      const productFound = userItems.find((item) => {
        if (item.productId === productId) {
          return item;
        }
      });

      // if product exists
      if (productFound) {
        // increase quantity
        item.quantity += parseInt(quantity);
        return productFound;
      }
    }

    // if the product is not available in the user cart
    const newProduct = new CartModel(userId, productId, quantity);
    cartItems.push(newProduct);
    return newProduct;
  };

  static remove = (cartItemId, userId) => {
    if (!cartItemId) {
      throw new Error("item id is required");
    }

    const foundCartItemIndex = cartItems.findIndex(
      (item) => item.id === cartItemId && item.userId === userId
    );

    if (foundCartItemIndex == -1) {
      throw new Error("Product not found");
    }

    cartItems.splice(foundCartItemIndex, 1);
  };

  static getById = (cartItemId) => {
    if (!cartItemId) {
      throw new Error("item id required");
    }
    const itemFound = cartItems.find((item) => item.id === cartItemId);
    if (!itemFound) {
      throw new Error("item not found");
    }
    return itemFound;
  };

  static increaseQuantity = (cartItemId) => {
    if (!cartItemId) {
      throw new Error("item id required");
    }
    const itemFound = this.getById(cartItemId);
    if (!itemFound) {
      throw new Error("item not found");
    }
    itemFound.quantity++;
  };

  static decreaseQuantity = (cartItemId) => {
    if (!cartItemId) {
      throw new Error("item id required");
    }
    const itemFound = this.getById(cartItemId);
    if (!itemFound) {
      throw new Error("item not found");
    }
    itemFound.quantity--;
  };
}

export default CartModel;
