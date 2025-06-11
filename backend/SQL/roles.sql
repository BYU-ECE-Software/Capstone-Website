CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name NVARCHAR(255) NOT NULL,
    -- figure out how to link this to permissions. Talk to Roman
);

INSERT INTO roles (role_name) -- before using this add the other columns that we deem necessary
VALUES ('Admin'), ('Student'), ('Coach')