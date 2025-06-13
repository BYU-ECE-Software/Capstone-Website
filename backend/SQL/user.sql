USE capstone;

CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name NVARCHAR(255) NOT NULL,
    last_name NVARCHAR(255) NOT NULL,
    preferred_name NVARCHAR(255), -- could be automatically the same as first_name if null
    major INT NOT NULL, -- we should have another table with the majors so that they are standardized. Now that I think about this, this will only apply to students so I'm gonna take off the NOT NULL. Or there could just be a number (0) assigned to non students
    net_id NVARCHAR(63) NOT NULL, -- shouldn't be longer than that
    byu_id INT NOT NULL, -- should it be an nvarchar(9) since it needs to be a 9 digit number?
    email NVARCHAR(255) NOT NULL,
    team_id INT, -- will reference the team table. Does this need to be a string instead? How will this need to be different for coaches?
    role_id INT NOT NULL, -- roles table will be very important. Tried to name it just role, but that is already a reserved keyword. 1 = Admin, 2 = Student, 3 = Coach
    phone NVARCHAR(12), -- 7 for number, 3 for area code, 2 for country code
);


-- WRITE AN INSERT STATEMENT ONCE WE GET THE SAML stuff worked out