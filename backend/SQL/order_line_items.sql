CREATE TABLE IF NOT EXISTS order_line_items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    price DECIMAL(10, 2),
    part_number VARCHAR(255),
    description TEXT,
    quantity INT,
    total DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);
