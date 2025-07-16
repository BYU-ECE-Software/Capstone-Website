USE capstone;

CREATE TABLE IF NOT EXISTS financial_category (
    financial_category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    financial_category_name NVARCHAR(255)
)