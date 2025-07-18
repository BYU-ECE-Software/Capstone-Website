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
        res.status(500).json({ error: 'Internal server error' });
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

exports.updateTeam = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const team = req.body;
        const updated = await teamService.updateTeam(teamId, team);
        res.status(200); // possibly 204
        res.send(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createTeam = async (req, res) => {
    try {
        const team = req.body;
        const created = await teamService.createTeam(team);
        res.status(201);
        res.send(created);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteTeam = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        await teamService.deleteTeam(teamId);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}