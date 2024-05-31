const products = [];

class CartModel {
  constructor(userId, productId, quantity) {
    this.id = uuidv4();
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
  }

  static get = (userId) => {
    const userCartItems = products.filter(item => item.userId === userId);
    return userCartItems;
  };

  static add = (userId, product) => {
    const {productId, quantity} = product;
    const newProduct = new CartModel(userId, productId, quantity);
    products.push(newProduct);
    return newProduct;
  };

  static remove = (userId, productId) => {
    const userCartItems = products.filter(item => item.userId === userId);
    const foundProductIndex = userCartItems.findIndex(item => item.productId === productId);
    if(foundProductIndex == -1){
      return "Product not found";
    }
    userCartItems.splice(foundProductIndex, 1);
  };
}

export default CartModel;
