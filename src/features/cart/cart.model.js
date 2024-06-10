class CartModel {
  constructor(userId, productId, quantity) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = parseInt(quantity);
  }
}

export default CartModel;
