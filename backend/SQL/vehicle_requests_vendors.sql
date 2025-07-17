USE capstone;

CREATE TABLE IF NOT EXISTS vehicle_requests_vendors (
    vehicle_request_id INT,
    vehicle_vendor_id INT,
    PRIMARY KEY (vehicle_request_id, vehicle_vendor_id),
    FOREIGN KEY (vehicle_request_id) REFERENCES vehicle_requests(vehicle_request_id),
    FOREIGN KEY (vehicle_vendor_id) REFERENCES vehicle_vendors(vehicle_vendor_id)
);