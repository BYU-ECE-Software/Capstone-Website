const teamService = require('../services/teamService');

exports.getTeamById = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const team = await teamService.getTeamById(teamId);

        if (!team) { // I assume this is the same as a not null check in JS
            return res.status(404).json({ error: 'Team not found' });
        }

        res.json(team);
    } catch (err) {
        console.error(err); // for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await teamService.getAllTeams();
        res.json(teams);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};