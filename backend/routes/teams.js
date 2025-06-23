const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// get the param from the url and pass to controller
router.get('/:teamId', teamController.getTeamById);

// get all the users
router.get('/', teamController.getAllTeams);

module.exports = router;