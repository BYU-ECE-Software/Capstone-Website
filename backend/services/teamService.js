const teamDAO = require("../daos/teamDAO");

exports.getTeamById = async (teamId) => {
    // any permission checks we want to do. (not everyone can access the team directory)
    // this is the place for logic and stuff though

    return await teamDAO.findById(teamId);
};

exports.getAllTeams = async () => {
    return await teamDAO.findAll();
};