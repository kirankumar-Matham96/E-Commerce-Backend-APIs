import { v4 as uuidv4 } from "uuid";
import {ApplicationError} from "../../errorHandler/applicationError.js";


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
      throw new ApplicationError("item id is required",400);
    }

    const foundCartItemIndex = cartItems.findIndex(
      (item) => item.id === cartItemId && item.userId === userId
    );

    if (foundCartItemIndex == -1) {
      throw new ApplicationError("Product not found",404);
    }

    cartItems.splice(foundCartItemIndex, 1);
  };

  static getById = (cartItemId) => {
    if (!cartItemId) {
      throw new ApplicationError("item id required",400);
    }
    const itemFound = cartItems.find((item) => item.id === cartItemId);
    if (!itemFound) {
      throw new ApplicationError("item not found", 404);
    }
    return itemFound;
  };

  static increaseQuantity = (cartItemId) => {
    if (!cartItemId) {
      throw new ApplicationError("item id required", 400);
    }
    const itemFound = this.getById(cartItemId);
    if (!itemFound) {
      throw new ApplicationError("item not found", 404);
    }
    itemFound.quantity++;
  };

  static decreaseQuantity = (cartItemId) => {
    if (!cartItemId) {
      throw new ApplicationError("item id required", 400);
    }
    const itemFound = this.getById(cartItemId);
    if (!itemFound) {
      throw new ApplicationError("item not found", 404);
    }
    itemFound.quantity--;
  };
}

export default CartModel;
