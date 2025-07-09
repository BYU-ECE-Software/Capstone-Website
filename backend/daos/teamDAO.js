const pool = require('../db/connection');

// given a user id, return a dictionary of their info
exports.findById = async (id) => {
    const teamSql = `SELECT
        team_id,
        team_name,
        logo
        FROM teams
        WHERE teams.team_id = ?
        GROUP BY teams.team_id, teams.team_name;`;

    const [rows] = await pool.query(teamSql, [id]);

    return rows[0];
    // return new Promise((resolve, reject) => {
    //     connection.query(teamSql, [id], (err, results) => {
    //         if (err) return reject(err);
    //         //console.log(results);
    //         resolve(results[0]);
    //     });
    // });
};

exports.findAll = async (callback) => {
    const [rows] = await pool.query('SELECT team_id FROM teams');
    return rows;
};

exports.insertTeam = async (team) => {
    console.log("team at dao = " + team);

    const createSql =
        `INSERT INTO teams (team_number,
            school_year, 
            grading_coach_1_id,
            grading_coach_2_id,
            er_director_id,
            long_distance_access_code,
            caedm_group_folder,
            project_id,
            logo,
            team_name,
            email_list,
            team_box_folder,
            class_doc_folder) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const connection = await pool.getConnection();
    const subTeam = team.team
    try {
        console.log(team.team);
        await connection.beginTransaction();
        const values = [subTeam.team_id, subTeam.school_year, subTeam.grading_coach_1_id, subTeam.grading_coach_2_id,
            subTeam.ER_director === '' ? null : parseInt(subTeam.ER_director), subTeam.long_distance_access_code === '' ? null : parseInt(subTeam.long_distance_access_code), 
            subTeam.caedm_group_folder === '' ? null : parseInt(subTeam.caedm_group_folder), subTeam.project === '' ? null : parseInt(subTeam.project),
            subTeam.logo, subTeam.team_name, subTeam.email_list, subTeam.team_box_folder === '' ? null : parseInt(subTeam.team_box_folder), 
            subTeam.class_document_folder === '' ? null : parseInt(subTeam.class_document_folder)
        ];
        const [res] = await connection.query(createSql, values); // need to convert this to an array from a dictionary


        await connection.commit();
        return {team_id: res.insertId, ...team}
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};