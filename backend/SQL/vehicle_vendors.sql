USE capstone;

CREATE TABLE IF NOT EXISTS vehicle_vendors (
    vehicle_vendor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vehicle_vendor_name NVARCHAR(255)
);