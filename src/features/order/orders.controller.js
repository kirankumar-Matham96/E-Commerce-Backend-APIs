import OrderRepository from "./orders.repository.js";

class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  confirmOrder = async (req, res) => {
    try {
      const userId = req.userId;
      const totalAmount = await this.orderRepository.placeOrder(userId);

      if (!totalAmount) {
        return res.status(500).send("Could not place the order");
      }

      res.status(200).send({
        status: "success",
        message: "Order is placed",
        totalAmount: totalAmount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("something wnt wrong");
    }
  };

  cancelOrder = async (req, res) => {
    this.orderRepository.cancel(orderId);
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send("something wnt wrong");
    }
  };

  getOrders = async (req, res) => {
    this.orderRepository.getAll();
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send("something wnt wrong");
    }
  };

  getOrderById = async (req, res) => {
    this.orderRepository.get();
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send("something wnt wrong");
    }
  };
}

export default OrderController;
