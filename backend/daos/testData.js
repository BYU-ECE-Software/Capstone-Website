/**
 * This file's purpose is to just run a bunch of inserts so that we have some rudimentary test data.
 * Therefore its lifespan is limited
 * I think I'll use a for loop to write in to the db arrays of dictionaries, but if someone thinks it would be better to just hardcode the SQL, let me know.
 */

// user test data
const users = [
    {
        first_name: "Mason",
        last_name: "Lewis",
        preferred_name: null,
        major: 1, // 1 could be Mech engineering. Or anything
        net_id: "mlewis", // not actually my net id
        byu_id: 123456789, // neither
        email: "mlewis@byu.edu",
        team_id: 1,
        role_id: 1, // admin?
        phone: "015554681357",
        photo: "./assets/user_1.jpg"
    },
    {
        first_name: "Jerry",
        last_name: "Seinfeld",
        preferred_name: null,
        major: 1, // 1 could be Mech engineering. Or anything
        net_id: "jersein", // not actually my net id
        byu_id: 223456789, // neither
        email: "jersien@byu.edu",
        team_id: 1,
        role_id: 2, // coach?
        phone: "015553572468",
        photo: "./assets/user_2.jpg"
    }
];

const teams = [
    {
        school_year: '2025-2026',
        coach_id: 2, // brother seinfeld
        long_distance_access_code: 1, //?
        caedm_group_folder: 27,
        project_id: 1,
        logo: "./assets/team_1.jpg",
        team_name: "The Best in the World",
        email_list: "['test@email.com', 'test2@email.com']",
        team_box_folder: 5290,
        class_doc_folder: 6248
    }
];
// team_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     school_year nvarchar(9) NOT NULL, -- 9 chars, eg. "2025-2026"
//     coach_id INT NOT NULL,
//     -- students will be connected to a team on their own table. See users.team_id
//     grading_coach_1_id INT, -- required?
//     grading_coach_2_id INT,
//     er_director_id INT, -- required?
//     long_distance_access_code INT,
//     caedm_group_folder INT,
//     project_id INT NOT NULL,
//     logo nvarchar(255), -- file path
//     team_name nvarchar(255) NOT NULL,
//     email_list longtext, -- json array?
//     team_box_folder INT,
//     class_doc_folder INT

const connection = require('../db/connection');

function insertLine(tableName, data) {
    // Extract columns and values from the object
    const columns = Object.keys(data);
    const values = Object.values(data);

    // Create placeholders for the values, e.g. "?, ?, ?"
    const placeholders = columns.map(() => '?').join(', ');

    // Build SQL query dynamically
    const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error: ", err);
            return;
        }
        // results.insertId contains the new user's id
        console.log(`Inserted into ${tableName}, ID: ${results.insertId}`);
    });
}

function createTestData() {
    for (let i = 0; i < users.length; i++) {
        //insertLine("users", users[i]);
    }
    for (let i = 0; i < teams.length; i++) {
        //insertLine("teams", teams[i]);
    }
}

if (require.main === module) {
    createTestData();
}