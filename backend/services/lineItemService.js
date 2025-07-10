const lineItemDAO = require("../daos/lineItemDAO");

/**
 * Insert all line items associated with an order.
 * @param {Array} lineItems - List of item objects (each must include order_id).
 */
exports.createLineItems = async (lineItems) => {
  if (!Array.isArray(lineItems)) {
    throw new Error("lineItems must be an array");
  }

  const insertPromises = lineItems.map((item) =>
    lineItemDAO.createLineItem(item)
  );
  return await Promise.all(insertPromises);
};
