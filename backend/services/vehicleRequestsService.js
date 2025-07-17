const vehicleRequestsDAO = require('../daos/vehicleRequestsDAO');

exports.getVehicleRequestById = async (vehicleRequestId) => {
    // any permission checks we want to do. (not everyone can access the team directory)
    // this is the place for logic and stuff though
    const vehicleRequest = await vehicleRequestsDAO.findById(vehicleRequestId);

    if (!vehicleRequest) {
        throw new Error(`Vehicle Request with ID ${vehicleRequestId} not found`);
    }
    
    return vehicleRequest;

};

exports.getAllVehicleRequests = async () => {
    const vehicleRequests = await vehicleRequestsDAO.findAll();
    return vehicleRequests;
};

// exports.createTeam = async (team) => {
//     const created = await teamDAO.insertTeam(team);
//     return created;
// };

// exports.updateTeam = async (teamId, team) => {
//     const updated = await teamDAO.updateTeam(teamId, team);
//     return updated;
// };

// exports.deleteTeam = async (teamId) => {
//     await teamDAO.deleteTeam(teamId);
// };