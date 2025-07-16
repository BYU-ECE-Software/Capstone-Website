USE capstone;

CREATE TABLE IF NOT EXISTS method (
    method_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    method_name NVARCHAR(255)
);