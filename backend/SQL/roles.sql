USE capstone;

CREATE TABLE IF NOT EXISTS roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name NVARCHAR(255) NOT NULL
    -- figure out how to link this to permissions. Talk to Roman
);

-- INSERT INTO roles (role_name) -- before using this add the other columns that we deem necessary
-- VALUES ('Admin'), ('Student'), ('Coach')

-- Right now on the backend we are treating role_id = 1 as student and 2 as coach. This should be easy to change once roles actually come into play