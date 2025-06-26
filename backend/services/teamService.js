const teamDAO = require("../daos/teamDAO");

exports.getTeamById = async (teamId) => {
    // any permission checks we want to do. (not everyone can access the team directory)
    // this is the place for logic and stuff though
    const team = await teamDAO.findById(teamId);
    if (!team.students) { // if there are no students then it will be undefined and that will cause problems on the frontend, we'd rather an empty list
        team.students = [];
    }
    if (!team.team) {
        return null;
    } else {
        return team;
    }
};

exports.getAllTeams = async () => {
    return await teamDAO.findAll();
};