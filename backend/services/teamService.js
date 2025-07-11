const teamDAO = require("../daos/teamDAO");
const userDAO = require("../daos/userDAO");

exports.getTeamById = async (teamId) => {
    // any permission checks we want to do. (not everyone can access the team directory)
    // this is the place for logic and stuff though
    const team = await teamDAO.findById(teamId);
    const students = await userDAO.findByTeamId(teamId);
    const coaches = await userDAO.coachByTeamId(teamId);

    if (!team) {
        throw new Error(`Team with ID ${teamId} not found`);
    }
    team.students = students;
    team.coach = coaches;

    if (!team.students) { // if there are no students then it will be undefined and that will cause problems on the frontend, we'd rather an empty list
        team.students = [];
    }

    return team;

};

exports.getAllTeams = async () => {
    const teams = await teamDAO.findAll();
    return teams;
};

exports.createTeam = async (team) => {
    const created = await teamDAO.insertTeam(team);
    return created;
};

exports.updateTeam = async (teamId, team) => {
    const updated = await teamDAO.updateTeam(teamId, team);
    return updated;
}