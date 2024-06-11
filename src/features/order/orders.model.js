class OrderModel {
  constructor(userId, totalAmount, timestamp) {
    this.userId = userId;
    this.totalAmount = totalAmount;
    this.timestamp = timestamp;
    // can be added later
    // this.itemId = itemId;
    // this.items = items;
  }
}

export default OrderModel;
