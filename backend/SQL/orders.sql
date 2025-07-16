USE capstone;

-- all fields (besides id) can be null. will need to go back in and make required fields not null
CREATE TABLE IF NOT EXISTS orders (
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    team_id INT,
    author INT,
    post_date DATETIME,
    total DECIMAL(10, 2),
    order_type INT,
    delivery_method INT,
    suggested_vendor INT,
    vendor_not_listed BOOLEAN,
    other_vendor NVARCHAR(255),
    quote_number INT,
    sales_rep_name NVARCHAR(255),
    sales_rep_email NVARCHAR(255),
    sales_rep_phone NVARCHAR(20),
    vendor_website NVARCHAR(255),
    tracking_number NVARCHAR(255),
    subtotal DECIMAL(10, 2),
    utah_tax DECIMAL(10, 2),
    other DECIMAL(10, 2),
    shipping DECIMAL(10, 2),
    invoice_total DECIMAL(10, 2),
    budget_total DECIMAL(10, 2),
    complexity ENUM('Advanced', 'Routine'), -- was change_state
    schedule ENUM('Immediately', 'Schedule'),
    comment TEXT,
    description TEXT,
    method INT,
    financial_category INT,
    month INT,
    office_notes TEXT,
    attached_file NVARCHAR(255), -- or LONGBLOB depending on how files are handled
    order_state INT,
    vendor INT,
    reference_number NVARCHAR(255),
    additional_information TEXT,
    FOREIGN KEY (author) REFERENCES users(user_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);