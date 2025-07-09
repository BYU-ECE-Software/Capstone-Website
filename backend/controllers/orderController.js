const orderService = require("../services/orderService");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

exports.submitPurchaseRequest = async (req, res) => {
  try {
    const requestData = req.body;
    console.log("Received Purchase Request:", requestData);

    // Call service to insert order and line items
    const orderId = await orderService.submitPurchaseRequest(requestData);

    res.status(201).json({ message: "Purchase request submitted", orderId });
  } catch (error) {
    console.error("Error submitting purchase request:", error);
    res.status(500).json({ error: "Failed to submit purchase request" });
  }
};
