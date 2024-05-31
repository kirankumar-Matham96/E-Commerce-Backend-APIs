import CartModel from "./cart.model.js";

class CartController {
  getCartItems = (req, res) => {
    const cartItems = CartModel.get(req.userId);
    res.status(200).json({ status: "success", cartItems: cartItems });
  };

  addItemToCart = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.query;
    if (quantity <= 0 || !Number.isInteger(Number(quantity))) {
      return res.status(400).json({
        status: "failure",
        error: "quantity should be positive integer",
      });
    }
    const cartItem = CartModel.add(req.userId, id, quantity);
    res.status(201).json({ status: "success", itemAdded: cartItem });
  };

  removeItemFromCart = (req, res) => {
    const { id } = req.params;
    const {userId} = req.userId;
    const error = CartModel.remove(id, userId);
    if (error) {
      return res.status(404).json({ status: "failure", error });
    }

    res.status(200).json({ status: "success", mes: "Product deleted" });
  };

  increaseCartItemQuantity = (req, res) => {
    const isIncreased = CartModel.increaseQuantity(req.params.id);
    if (isIncreased) {
      return res
        .status(200)
        .json({ status: "success", msg: "Quantity increased" });
    }
    res.status(400).json({ status: "failure", msg: "item not found" });
  };

  decreaseCartItemQuantity = (req, res) => {
    const isDecreased = CartModel.decreaseQuantity(req.params.id);
    if (isDecreased) {
      return res
        .status(200)
        .json({ status: "success", msg: "Quantity decreased" });
    }
    res.status(400).json({ status: "failure", msg: "item not found" });
  };
}

export default CartController;
