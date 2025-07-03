const express = require('express');
const router = express.Router();
const budgetAllocationController = require('../controllers/budgetAllocationController');

// get the param from the url and pass to controller
router.get('/:budgetAllocationId', budgetAllocationController.getBudgetAllocationById);

// get all the users
router.get('/', budgetAllocationController.getAllBudgetAllocations);

module.exports = router;