const orderDAO = require("../daos/orderDAO");
const lineItemService = require("./lineItemService");

exports.getAllOrders = async () => {
  return await orderDAO.getAllOrders();
};

exports.submitPurchaseRequest = async (orderData) => {
  try {
    // 1. Destructure line items and remove from orderData
    const { line_items, ...orderFields } = orderData;

    // 2. Insert the order and get the new order ID
    const orderId = await orderDAO.createOrder(orderFields);

    // 3. If there are line items, insert them with the new order ID
    if (Array.isArray(line_items) && line_items.length > 0) {
      const itemsWithOrderId = line_items.map((item) => ({
        ...item,
        order_id: orderId,
      }));

      await lineItemService.createLineItems(itemsWithOrderId);
    }

    return orderId;
  } catch (error) {
    console.error("Error submitting purchase request:", error);
    throw error;
  }
};
