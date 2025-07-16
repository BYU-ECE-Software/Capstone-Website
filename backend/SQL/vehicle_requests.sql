USE capstone;

CREATE TABLE IF NOT EXISTS vehicle_requests (
    vehicle_request_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    team_id INT,
    author INT,
    vehicle_request_state_id INT,
    pickup_date DATETIME,
    dropoff_date DATETIME,
    valid_van_card BOOLEAN,
    destination_city NVARCHAR(255),
    trip_purpose TEXT,
    preferred_vehicle INT,
    total DECIMAL,
    complexity ENUM('Advanced', 'Routine'),
    schedule ENUM('Immediately', 'Schedule for state change'),
    comment TEXT,
    post_date DATETIME,
    method INT,
    financial_category INT,
    vr_month INT,
    office_notes TEXT,
    FOREIGN KEY (team_id) REFERENCES teams(team_id),
    FOREIGN KEY (author) REFERENCES users(user_id),
    FOREIGN KEY (preferred_vehicle) REFERENCES preferred_vehicle(preferred_vehicle_id),
    FOREIGN KEY (method) REFERENCES method(method_id),
    FOREIGN KEY (financial_category) REFERENCES financial_category(financial_category_id)
);