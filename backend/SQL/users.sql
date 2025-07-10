USE capstone;

CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    preferred_name VARCHAR(255), -- could be automatically the same as first_name if null
    major INT NOT NULL, -- we should have another table with the majors so that they are standardized. Now that I think about this, this will only apply to students so I'm gonna take off the NOT NULL. Or there could just be a number (0) assigned to non students
    net_id VARCHAR(63) NOT NULL, -- shouldn't be longer than that
    byu_id INT NOT NULL, -- should it be an nvarchar(9) since it needs to be a 9 digit number?
    email VARCHAR(255) NOT NULL,
    team_id INT, -- How will this need to be different for coaches?
    role_id INT NOT NULL, -- roles table will be very important. Tried to name it just role, but that is already a reserved keyword.
    phone VARCHAR(12), -- 7 for number, 3 for area code, 2 for country code
    photo MEDIUMTEXT, -- file path to the assets folder ./assets/
    FOREIGN KEY (team_id) REFERENCES teams(team_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);


-- WRITE AN INSERT STATEMENT ONCE WE GET THE SAML stuff worked out


-- So here's the thing. Students will have a team_id, but coaches won't. 
-- Should we have seperate tables for coach and student, or just assume that the coach team_id will be null?
-- I'm leaning toward the latter, just for simplicity's sake. The backend just needs to know that.
-- Maybe once we transition to prisma this'll be a non-issue.