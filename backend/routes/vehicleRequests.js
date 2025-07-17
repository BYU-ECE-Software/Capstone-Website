const express = require('express');
const router = express.Router();
const vehicleRequestsController = require('../controllers/vehicleRequestsController');

// get the param from the url and pass to controller
router.route('/:vehicle_requestId')
    //.put(teamController.updateTeam)
    .get(vehicleRequestsController.getVehicleRequestById);
    //.delete(teamController.deleteTeam);

// get all the users
router.route('/')
    //.post(teamController.createTeam)
    .get(vehicleRequestsController.getAllVehicleRequests);

module.exports = router;