const teamDAO = require("../daos/teamDAO");
const userDAO = require("../daos/userDAO");

exports.getTeamById = async (teamId) => {
    // any permission checks we want to do. (not everyone can access the team directory)
    // this is the place for logic and stuff though
    const team = await teamDAO.findById(teamId);
    const students = await userDAO.findByTeamId(teamId);
    const coach = await userDAO.coachByTeamId(teamId);

    team.students = students;
    team.coach = coach;

    //console.log(team);
    if (!team.students) { // if there are no students then it will be undefined and that will cause problems on the frontend, we'd rather an empty list
        team.students = [];
    }

    return team;

};

exports.getAllTeams = async () => {
    const teams = await teamDAO.findAll();
    return teams;
};