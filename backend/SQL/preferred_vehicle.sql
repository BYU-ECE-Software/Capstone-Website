USE capstone;

CREATE TABLE IF NOT EXISTS preferred_vehicle (
    preferred_vehicle_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    preferred_vehicle_name NVARCHAR(255)
);