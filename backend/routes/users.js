const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// get the param from the url and pass to controller
router.get('/:userId', userController.getUserById);

// get all the users
router.get('/', userController.getAllUsers);

module.exports = router;