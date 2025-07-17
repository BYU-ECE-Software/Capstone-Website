USE capstone;

CREATE TABLE IF NOT EXISTS vehicle_request_state (
    vehicle_request_state_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vehicle_request_state_name NVARCHAR(255)
);

INSERT INTO vehicle_request_state (vehicle_request_state_name) VALUES ('Requested');