USE capstone;

CREATE TABLE IF NOT EXISTS team_coaches (
    team_id INT,
    coach_id INT,
    PRIMARY KEY (team_id, coach_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id),
    FOREIGN KEY (coach_id) REFERENCES users(user_id)
);