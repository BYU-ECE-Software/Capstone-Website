const budgetAllocationDAO = require("../daos/budgetAllocationDAO");

exports.getBudgetAllocationById = async (budgetAllocationId) => {
    // any permission checks we want to do. (not everyone can access the budget allocations page)
    // this is the place for logic and stuff though
    const budgetAllocation = await budgetAllocationDAO.findById(budgetAllocationId);
    if (!budgetAllocation.author) { // if there are no students then it will be undefined and that will cause problems on the frontend, we'd rather an empty list
        budgetAllocation.author = [];
    }
    if (!budgetAllocation.budgetAllocation) {
        return null;
    } else {
        return budgetAllocation;
    }
};

exports.getAllBudgetAllocations = async () => {
    return await budgetAllocationDAO.findAll();
};