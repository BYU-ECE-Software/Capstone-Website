const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// get the param from the url and pass to controller
router.route('/:teamId')
    .put(teamController.updateTeam)
    .get(teamController.getTeamById);

// get all the users
router.route('/')
    .post(teamController.createTeam)
    .get(teamController.getAllTeams);

module.exports = router;