const connection = require("../db/connection");

exports.createLineItem = async (lineItem) => {
  const sql = `
    INSERT INTO order_line_items (
      order_id,
      price,
      part_number,
      description,
      quantity,
      total
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    lineItem.order_id,
    lineItem.price,
    lineItem.part_number,
    lineItem.description,
    lineItem.quantity,
    lineItem.total,
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};
