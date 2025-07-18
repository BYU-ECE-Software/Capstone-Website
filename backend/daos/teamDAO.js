const pool = require('../db/connection');

// given a team id, return a dictionary of their info
exports.findById = async (id) => {
    const teamSql = `SELECT
        *
        FROM teams
        WHERE teams.team_id = ?
        GROUP BY teams.team_id, teams.team_name;`;

    const [rows] = await pool.query(teamSql, [id]);

    return rows[0];
};

exports.findAll = async () => {
    const [rows] = await pool.query('SELECT team_id FROM teams');
    return rows;
};

exports.insertTeam = async (team) => {
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
    try {
        const subTeam = team.team;
        await connection.beginTransaction();
        var res = null;
        if (subTeam) {
            const values = [subTeam.team_id, subTeam.school_year, subTeam.grading_coach_1_id, subTeam.grading_coach_2_id,
                subTeam.ER_director, subTeam.long_distance_access_code, 
                subTeam.caedm_group_folder, subTeam.project,
                subTeam.logo, subTeam.team_name, subTeam.email_list.join(","), subTeam.team_box_folder, 
                subTeam.class_document_folder,
            ];
            [res] = await connection.query(createSql, values); // need to convert this to an array from a dictionary
        }

        // this probably should be done in the userDAO and then just called from here.
        const students = team.students;
        if (students) {
            for (var i = 0; i < students.length; i++) {
                await connection.query('UPDATE users SET team_id = ? WHERE user_id = ?', [res.insertId, students[i].user_id]);
            }
        }

        const coaches = team.coach;
        if (coaches) {
            for (var i = 0; i < coaches.length; i++) {
                await connection.query('INSERT INTO team_coaches (team_id, coach_id) VALUES (?,?)', [res.insertId, coaches[i].user_id]);
            }
        }

        await connection.commit();
        return {team: {...team.team, team_id: res ? res.insertId : null}, students: students, coach: [team.coach]};
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

exports.updateTeam = async (teamId, team) => {
    const updateSql =
        `UPDATE teams SET
            team_number = ?,
            school_year = ?, 
            grading_coach_1_id = ?,
            grading_coach_2_id = ?,
            er_director_id = ?,
            long_distance_access_code = ?,
            caedm_group_folder = ?,
            project_id = ?,
            logo = ?,
            team_name = ?,
            email_list = ?,
            team_box_folder = ?,
            class_doc_folder = ?
        WHERE team_id = ?`;
    
    const connection = await pool.getConnection();
    try {
        const studentRole = 1;
        const oldStudentsResult = await pool.query('SELECT user_id FROM users WHERE team_id = ? AND role_id = ?', [teamId, studentRole]);
        const oldStudents = oldStudentsResult[0];
        const subTeam = team.team;
        await connection.beginTransaction();
        var res = null;
        if (subTeam) {
            const values = [subTeam.team_number, subTeam.school_year, subTeam.grading_coach_1_id, subTeam.grading_coach_2_id,
                subTeam.ER_director, subTeam.long_distance_access_code, 
                subTeam.caedm_group_folder, subTeam.project,
                subTeam.logo, subTeam.team_name, subTeam.email_list, subTeam.team_box_folder, 
                subTeam.class_document_folder,
                teamId
            ];
            [res] = await connection.query(updateSql, values);
        }

        // all this logic should probably be done inside the userDAO and just exported as a function to be called here
        const students = team.students;
        if (students) {
            // remove the students that were removed by the user
            const removedStudentIds = oldStudents.filter(oldId => !students.some(student => student.user_id === oldId)).map(s => s.user_id);
            for (var i = 0; i < removedStudentIds.length; i++) {
                await connection.query('UPDATE users SET team_id = NULL WHERE user_id = ?', [removedStudentIds[i]]);
            }
            const addedStudentIds = students.map(s => s.user_id).filter(newId => !oldStudents.includes(newId));
            for (var i = 0; i < addedStudentIds.length; i++) {
                await connection.query('UPDATE users SET team_id = ? WHERE user_id = ?', [teamId, addedStudentIds[i]]);
            }
        }

        const coaches = team.coach;
        if (coaches) {
            // this might not be the most efficient, but probably the easiest way to do this is to delete all coaches from this team then reinsert the passed in ones
            await connection.query('DELETE FROM team_coaches WHERE team_id = ?', [teamId]);
            for (var i = 0; i < coaches.length; i++) {
                await connection.query('INSERT INTO team_coaches (team_id, coach_id) VALUES (?,?)', [teamId, coaches[i].user_id]);
            }
        }
        
        await connection.commit();

        return {...team}
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

exports.deleteTeam = async (id) => {
    // must first go through and remove all references to this team from users (students) and team_coaches
    // this means we need to pass the entire team in in order to do that, then run a similar process to the above functions
    // or just pull it straight from the table
    await pool.query(`DELETE FROM team_coaches WHERE team_id = ?`, [id]);
    await pool.query(`UPDATE users SET team_id = NULL WHERE team_id = ?`, [id]);
    const teamSql = `DELETE FROM teams
        WHERE teams.team_id = ?`;

    await pool.query(teamSql, [id]);

    return;
};