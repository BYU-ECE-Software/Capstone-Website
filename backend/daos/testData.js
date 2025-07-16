/**
 * This file's purpose is to just run a bunch of inserts so that we have some rudimentary test data.
 * Therefore its lifespan is limited
 * I think I'll use a for loop to write in to the db arrays of dictionaries, but if someone thinks it would be better to just hardcode the SQL, let me know.
 */

// user test data
const users = [
    {
        first_name: "Jansen",
        last_name: "Mewis",
        preferred_name: null,
        major: 1, // 1 could be Mech engineering. Or anything
        net_id: "jmewis", // not actually my net id
        byu_id: 123456789, // neither
        email: "jmewis@byu.edu",
        team_id: 1,
        role_id: 1, // admin?
        phone: "015554681357",
        photo: "user_1.jpg"
    },
    {
        first_name: "Darry",
        last_name: "Meinfeld",
        preferred_name: null,
        major: 1, // 1 could be Mech engineering. Or anything
        net_id: "dermein", // not actually my net id
        byu_id: 223456789, // neither
        email: "jersien@byu.edu",
        team_id: 1,
        role_id: 2, // coach?
        phone: "015553572468",
        photo: "user_2.jpg"
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
        role_id: 1, // coach?
        phone: "015553572468",
        photo: "user_2.jpg"
    },
    {
        first_name: "Mason",
        last_name: "Lewis",
        preferred_name: null,
        major: 1, // 1 could be Mech engineering. Or anything
        net_id: "mlewis", // not actually my net id
        byu_id: 223456789, // neither
        email: "mlewis@byu.edu",
        team_id: 1,
        role_id: 1,
        phone: "015553572468",
        photo: "user_1.jpg"
    }
];

const teams = [
    {
        school_year: '2025-2026',
        coach_id: 6, // brother seinfeld
        long_distance_access_code: 1, //?
        caedm_group_folder: 37,
        project_id: 1,
        logo: "./assets/team_1.jpg",
        team_name: "The Second Best in the World",
        email_list: "['test@email.com', 'test2@email.com']",
        team_box_folder: 6290,
        class_doc_folder: 7248
    }
];

const vehicle_vendors = [
    {
        vehicle_vendor_name: "BYU Vehicle Rentals"
    },
    {
        vehicle_vendor_name: "Enterprise Rent-a-Car"
    },
    {
        vehicle_vendor_name: "Samsung"
    }
]

const pool = require('../db/connection');

function insertLine(tableName, data) {
    // Extract columns and values from the object
    const columns = Object.keys(data);
    const values = Object.values(data);

    // Create placeholders for the values, e.g. "?, ?, ?"
    const placeholders = columns.map(() => '?').join(', ');

    // Build SQL query dynamically
    const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;

    pool.query(sql, values, (err, results) => {
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
        if (users[i].role_id == 1) {
            //insertLine("users", users[i]);
        } else if (users[i].role_id == 2) {
            // UNTESTED!! I have just manually set up my team_coaches table. Please try this and let me (Mason) know if it doesn't work
            // const teamId = users[i].team_id;
            // const coach = {...users[i]}; // is this by reference?
            // coach.team_id = null; // will this change the original users array?
            // insertLine("users", coach);
            // insertLine("team_coaches", {team_id: teamId, coach_id: coach.user_id})
        }
    }
    for (let i = 0; i < teams.length; i++) {
        //insertLine("teams", teams[i]); // uncomment to append the contents of the teams dictionary to the teams table
    }
    for (let i = 0; i < vehicle_vendors.length; i++) {
        insertLine("vehicle_vendors", vehicle_vendors[i]);
    }
    console.log("Finished inserting test data into database");
}

if (require.main === module) {
    createTestData();
}