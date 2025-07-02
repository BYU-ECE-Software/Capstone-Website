USE capstone;

CREATE TABLE IF NOT EXISTS budget_allocations (
    author_id INT NOT NULL,
    budget_allocation_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    description nvarchar(255),
    method nvarchar(9),
    financial_category nvarchar(9),
    generic_transaction_state nvarchar(9),
    month nvarchar(255),
    office_notes nvarchar(255),
    post_date DATETIME -- <- ensure SQL recognizes this data type.
    schedule BIT, -- CHOICE BETWEEN: "immediately" or "schedule for state change."
    team_id INT NOT NULL,
    total DECIMAL, -- can specify precision and scale if need be.
    sponsor INT nvarchar(9),
);