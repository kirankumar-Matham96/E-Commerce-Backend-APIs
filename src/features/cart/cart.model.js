const products = [];

class CartModel {
  constructor(productId, userId, quantity) {
    this.id = uuidv4();
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
  }

  get = (userId) => {
    const userCartItems = products.filter(item => item.userId === userId);
    return userCartItems;
  };

  add = (userId, product) => {
    const {productId, quantity} = product;
    const newProduct = new CartModel(productId,userId,quantity);
    products.push(newProduct);
    return newProduct;
  };

  remove = (userId, productId) => {
    const userCartItems = products.filter(item => item.userId === userId);
    const foundProductIndex = userCartItems.findIndex(item => item.productId === productId);
    if(foundProductIndex == -1){
      return "Product not found";
    }
    userCartItems.splice(foundProductIndex, 1);
  };
}

export default CartModel;
