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
                resolve(results);
            });
        });

        // Resolve everything together
        Promise.all([teamPromise, coachPromise, studentPromise])
            .then(([team, coach, students]) => {
                resolve({team, coach, students})
            })
            .catch(reject);
    });

    // return new Promise((resolve, reject) => {
    //     connection.query(`SELECT 
    //         teams.team_id, 
    //         teams.team_name,
    //         JSON_ARRAYAGG(
    //             JSON_OBJECT('user_id', users.user_id, 
    //                 'first_name', users.first_name,
    //                 'last_name', users.last_name,
    //                 'phone', users.phone,
    //                 'net_id', users.net_id,
    //                 'major', users.major,
    //                 'photo', users.photo,
    //                 'email', users.email
    //             )
    //         ) AS students
    //         FROM teams LEFT JOIN users ON users.team_id = teams.team_id 
    //         WHERE teams.team_id = ?
    //         GROUP BY teams.team_id, teams.team_name;`, [id], (err, results) => {
    //     if (err) return reject(err);
    //     resolve(results[0]);
    //     });
    // });
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

    // get rid of this code if the above works
    const teamSql = `SELECT
        teams.team_id,
        teams.team_name,
        teams.logo
        FROM teams;`;
    const coachSql = "SELECT * FROM users WHERE role_id = ?";
    const coachRole = 2;
    const studentSql = "SELECT * FROM users WHERE role_id = ?";
    const studentRole = 1;


    // run each individual query
    const teamPromise = new Promise((resolve, reject) => {
        connection.query(teamSql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

    const coachPromise = new Promise((resolve, reject) => {
        connection.query(coachSql, [coachRole], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

    const studentPromise = new Promise((resolve, reject) => {
        connection.query(studentSql, [studentRole], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

    // Resolve everything together
    const [teams, coaches, students] = await Promise.all([teamPromise, coachPromise, studentPromise]);
    
    const coachMap = new Map();
    for (const coach of coaches) {
        coachMap.set(coach.team_id, {
            user_id: coach.user_id,
            first_name: coach.first_name, // add other fields
            last_name: coach.last_name,
            phone: coach.phone,
            email: coach.email,
            photo: coach.photo,
            major: coach.major,
        });
    }

    const studentMap = new Map();
    for (const student of students) {
        if (!studentMap.has(student.team_id)) {
            studentMap.set(student.team_id, []);
        }
        studentMap.get(student.team_id).push({
            user_id: student.user_id,
            first_name: student.first_name, // add other fields
            last_name: student.last_name,
            phone: student.phone,
            email: student.email,
            photo: student.photo,
            major: student.major,
            net_id: student.net_id
        });
    }

    const result = teams.map(team => ({
        team_id: team.team_id,
        team_name: team.team_name,
        logo: team.logo,
        coach: coachMap.get(team.team_id) || null,
        students: studentMap.get(team.team_id) || []
    }));

    return result;
}