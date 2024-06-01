import CartModel from "./cart.model.js";

class CartController {
  getCartItems = (req, res) => {
    const cartItems = CartModel.get(req.userId);
    res.status(200).json({ status: "success", cartItems: cartItems });
  };

  addItemToCart = (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.query;

      if (!id) {
        throw new Error("product id is required");
      }

      if (!quantity) {
        throw new Error("quantity is required");
      }

      if (quantity <= 0 || !Number.isInteger(Number(quantity))) {
        throw new Error("quantity should be positive integer");
      }

      const cartItem = CartModel.add(req.userId, id, quantity);
      res.status(201).json({ status: "success", itemAdded: cartItem });
    } catch (error) {
      res.status(400).json({ status: "failure", error: error.message });
    }
  };

  removeItemFromCart = (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.userId;

      if (!id) {
        throw new Error("item id required");
      }

      CartModel.remove(id, userId);
      res.status(200).json({ status: "success", mes: "Product deleted" });
    } catch (error) {
      res.status(400).json({ status: "failure", error: error.message });
    }
  };

  increaseCartItemQuantity = (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("item id required");
      }

      CartModel.increaseQuantity(id);
      res
        .status(200)
        .json({ status: "success", message: "Quantity increased" });
    } catch (error) {
      res.status(400).json({ status: "failure", error: error.message });
    }
  };

  decreaseCartItemQuantity = (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("item id required");
      }

      CartModel.decreaseQuantity(id);
      res
        .status(200)
        .json({ status: "success", message: "Quantity decreased" });
    } catch (error) {
      res.status(400).json({ status: "failure", error: error.message });
    }
  };
}

export default CartController;
