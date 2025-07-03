const budgetAllocationService = require('../services/budgetAllocationService');

exports.getBudgetAllocationById = async (req, res) => {
    try {
        const budgetAllocationId = req.params.budgetAllocationId;
        const budgetAllocation = await userService.getUserById(budgetAllocationId);

        if (!user) { // I assume this is the same as a not null check in JS
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(budgetAllocation);
    } catch (err) {
        console.error(err); // for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllBudgetAllocations = async (req, res) => {
    try {
        const budgetAllocations = await budgetAllocationService.getAllBudgetAllocations();
        res.json(budgetAllocations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};