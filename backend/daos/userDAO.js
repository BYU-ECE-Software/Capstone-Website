const connection = require('../db/connection');


// given a user id, return a dictionary of their info
exports.findById = (id, callback) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE user_id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
        });
    });
};

// return all the users on a given team
exports.findByTeamId = (id, callback) => {
    const studentSql = "SELECT * FROM users WHERE team_id = ? AND role_id = ?";
    const studentRole = 1;
    return new Promise((resolve, reject) => {
        connection.query(studentSql, [id, studentRole], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(results[0]);
            }
        });
    });
}

// return the teams coach(s?)
exports.coachByTeamId = (id, callback) => {
    const coachSql = "SELECT * FROM users WHERE team_id = ? AND role_id = ?";
    const coachRole = 2;
    return new Promise((resolve, reject) => {
        connection.query(coachSql, [id, coachRole], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
}

// return all the users in the database
exports.findAll = (callback) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
    
}