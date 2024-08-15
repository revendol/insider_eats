import CloverRepo from "@repos/CloverRepo";

class CloverService {
  async createOrderService() {
    try {
      const orderData = await CloverRepo.createOrder();
      return orderData;
    } catch (error) {
      throw new Error("Error in creating order service");
    }
  }
}

export default new CloverService();
