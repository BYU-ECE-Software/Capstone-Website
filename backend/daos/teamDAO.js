const connection = require('../db/connection');

// given a user id, return a dictionary of their info
exports.findById = (id, callback) => {
    const teamSql = `SELECT
        team_id,
        team_name,
        logo
        FROM teams
        WHERE teams.team_id = ?
        GROUP BY teams.team_id, teams.team_name;`;
    const coachSql = "SELECT * FROM users WHERE team_id = ? AND role_id = ?";
    const coachRole = 2;
    const studentSql = "SELECT * FROM users WHERE team_id = ? AND role_id = ?";
    const studentRole = 1;

    return new Promise((resolve, reject) => {
        // run each individual query
        const teamPromise = new Promise((resolve, reject) => {
            connection.query(teamSql, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });

        const coachPromise = new Promise((resolve, reject) => {
            connection.query(coachSql, [id, coachRole], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });

        const studentPromise = new Promise((resolve, reject) => {
            connection.query(studentSql, [id, studentRole], (err, results) => {
                if (err) return reject(err);
                if (results.length > 0) {
                    resolve(results);
                } else {
                    resolve(results[0]);
                }
            });
        });

        // Resolve everything together
        Promise.all([teamPromise, coachPromise, studentPromise])
            .then(([team, coach, students]) => {
                resolve({team, coach, students})
            })
            .catch(reject);
    });
};

/** So, thinking about this function, it might not be necessary to pull all the data, we might just need a list of all the PKs (filtered by school year)
 * Then we'll just iteratively call the other endpoint to get the individual data for each team.
 */
exports.findAll = async (callback) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT team_id FROM teams', (err, results) => { // add a school year filter later
            if (err) return reject(err);
            resolve(results);
        });
    });
}