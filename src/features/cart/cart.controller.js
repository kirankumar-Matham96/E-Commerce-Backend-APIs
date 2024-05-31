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
    const error = CartModel.remove(req.userId, id);
    if (error) {
      return res.status(400).json({ status: "failure", error });
    }

    res.status(200).json({ status: "success", mes: "Product deleted" });
  };
}

export default CartController;
