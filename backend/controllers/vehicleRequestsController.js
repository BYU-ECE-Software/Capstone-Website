const vehicleRequestsService = require('../services/vehicleRequestsService');

exports.getVehicleRequestById = async (req, res) => {
    try {
        const vehicleRequestId = req.params.vehicle_requestId;
        const vehicleRequest = await vehicleRequestsService.getVehicleRequestById(vehicleRequestId);

        if (!vehicleRequest) { // I assume this is the same as a not null check in JS
            return res.status(404).json({ error: 'Vehicle Request not found' });
        }

        res.json(vehicleRequest);
    } catch (err) {
        console.error(err); // for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllVehicleRequests = async (req, res) => {
    try {
        const vehicleRequests = await vehicleRequestsService.getAllVehicleRequests();
        res.json(vehicleRequests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// exports.updateTeam = async (req, res) => {
//     try {
//         const teamId = req.params.teamId;
//         const team = req.body;
//         const updated = await teamService.updateTeam(teamId, team);
//         res.status(200); // possibly 204
//         res.send(updated);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// exports.createTeam = async (req, res) => {
//     try {
//         const team = req.body;
//         const created = await teamService.createTeam(team);
//         res.status(201);
//         res.send(created);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// exports.deleteTeam = async (req, res) => {
//     try {
//         const teamId = req.params.teamId;
//         await teamService.deleteTeam(teamId);
//         res.status(204).send();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }