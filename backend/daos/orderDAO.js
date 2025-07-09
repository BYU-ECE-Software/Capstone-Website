const connection = require("../db/connection");

exports.getAllOrders = async () => {
  const sql = `
    SELECT * FROM orders
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.createOrder = async (orderData) => {
  const sql = `
    INSERT INTO orders (
      team_id,
      author,
      post_date,
      total,
      order_type,
      delivery_method,
      suggested_vendor,
      vendor_not_listed,
      other_vendor,
      quote_number,
      sales_rep_name,
      sales_rep_email,
      sales_rep_phone,
      vendor_website,
      tracking_number,
      subtotal,
      utah_tax,
      other,
      shipping,
      invoice_total,
      budget_total,
      change_state,
      schedule,
      comment,
      description,
      method,
      financial_category,
      month,
      office_notes,
      attached_file,
      order_state,
      vendor,
      reference_number,
      additional_information
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    orderData.team_id,
    orderData.author,
    orderData.post_date,
    orderData.total,
    orderData.order_type,
    orderData.delivery_method,
    orderData.suggested_vendor,
    orderData.vendor_not_listed,
    orderData.other_vendor,
    orderData.quote_number,
    orderData.sales_rep_name,
    orderData.sales_rep_email,
    orderData.sales_rep_phone,
    orderData.vendor_website,
    orderData.tracking_number,
    orderData.subtotal,
    orderData.utah_tax,
    orderData.other,
    orderData.shipping,
    orderData.invoice_total,
    orderData.budget_total,
    orderData.change_state,
    orderData.schedule,
    orderData.comment,
    orderData.description,
    orderData.method,
    orderData.financial_category,
    orderData.month,
    orderData.office_notes,
    orderData.attached_file,
    orderData.order_state,
    orderData.vendor,
    orderData.reference_number,
    orderData.additional_information,
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};
