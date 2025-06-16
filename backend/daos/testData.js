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
        insertLine("users", users[i]);
    }
}

if (require.main === module) {
    createTestData();
}