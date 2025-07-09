const pool = require('../db/connection');


// given a user id, return a dictionary of their info
exports.findById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    return rows[0];
};

// return all the users on a given team
exports.findByTeamId = async (id) => {
    const studentSql = "SELECT * FROM users WHERE team_id = ? AND role_id = ?";
    const studentRole = 1;
    const [rows] = await pool.query(studentSql, [id, studentRole]);
    
    return rows;
    // return new Promise((resolve, reject) => {
    //     pool.query(studentSql, [id, studentRole], (err, results) => {
    //         if (err) return reject(err);
    //         if (results.length > 0) {
    //             resolve(results);
    //         } else {
    //             resolve(results[0]);
    //         }
    //     });
    // });
}

// return the teams coach(s?)
exports.coachByTeamId = async (id) => {
    const coachSql = "SELECT * FROM users WHERE team_id = ? AND role_id = ?";
    const coachRole = 2;
    const [rows] = await pool.query(coachSql, [id, coachRole]);
    return rows[0] // will need to change to support multiple coaches
}

// return all the users in the database
exports.findAll = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

exports.findAllStudents = async () => {
    // there should be in another branch another function that uses the studentRole variable. Put them together when merges happen.
    const studentRole = 1;
    const [rows] = await pool.query('SELECT * FROM users WHERE role_id = ?', [studentRole]);
    return rows;
}

exports.findAllCoaches = async () => {
    // there should be in another branch another function that uses the coachRole variable. Put them together when merges happen.
    const coachRole = 2;
    const [rows] = await pool.query('SELECT * FROM users WHERE role_id = ?', [coachRole]);
    return rows;
}