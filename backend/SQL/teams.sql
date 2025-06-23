USE capstone;

CREATE TABLE IF NOT EXISTS teams (
    team_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    school_year nvarchar(9) NOT NULL, -- 9 chars, eg. "2025-2026"
    coach_id INT NOT NULL,
    -- students will be connected to a team on their own table. See users.team_id
    grading_coach_1_id INT, -- required?
    grading_coach_2_id INT,
    er_director_id INT, -- required?
    long_distance_access_code INT,
    caedm_group_folder INT,
    project_id INT NOT NULL,
    logo nvarchar(255), -- file path
    team_name nvarchar(255) NOT NULL,
    email_list longtext, -- json array?
    team_box_folder INT,
    class_doc_folder INT
);