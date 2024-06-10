import CartModel from "./cart.model.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";
import CartRepository from "./cart.repository.js";

class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  getCartItems = async (req, res) => {
    const userId = req.userId;
    const cartItems = await this.cartRepository.get(userId);
    res.status(200).json({ status: "success", cartItems: cartItems });
  };

  getCartItemById = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApplicationError("cart item id required", 400);
      }
      const itemFound = await this.cartRepository.getById(id);
      res.status(200).send({ status: "success", itemFound });
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  };

  addItemToCart = async (req, res) => {
    try {
      const userId = req.userId;
      const { productId, quantity } = req.body;

      if (!quantity) {
        throw new ApplicationError("quantity is required", 400);
      }

      if (quantity <= 0 || !Number.isInteger(Number(quantity))) {
        throw new ApplicationError("quantity should be positive integer", 400);
      }

      const cartItem = new CartModel(userId, productId, quantity);
      await this.cartRepository.add(cartItem);
      res.status(201).json({ status: "success", itemAdded: cartItem });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: "failure", error: error.message });
    }
  };

  removeItemFromCart = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.userId;

      if (!id) {
        throw new ApplicationError("item id required", 400);
      }

      const isDeleted = await this.cartRepository.remove(id, userId);
      isDeleted
        ? res.status(200).json({ status: "success", mes: "Product deleted" })
        : res.status(404).json({ status: "failure", error: "item not found" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: "failure", error: error.message });
    }
  };

  increaseCartItemQuantity = async (req, res) => {
    try {
      const { productId } = req.body;
      if (!productId) {
        throw new ApplicationError("item id required", 400);
      }

      await this.cartRepository.increaseQuantity(productId);
      res
        .status(200)
        .json({ status: "success", message: "Quantity increased" });
    } catch (error) {
      res.status(400).json({ status: "failure", error: error.message });
    }
  };

  decreaseCartItemQuantity = async (req, res) => {
    try {
      const { productId } = req.body;
      if (!productId) {
        throw new ApplicationError("item id required", 400);
      }

      await this.cartRepository.decreaseQuantity(productId);
      res
        .status(200)
        .json({ status: "success", message: "Quantity decreased" });
    } catch (error) {
      res.status(400).json({ status: "failure", error: error.message });
    }
  };
}

export default CartController;
