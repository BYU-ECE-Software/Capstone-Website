const connection = require('../db/connection');

exports.findById = (id, callback) => {
    const budgetAllocationSql = `SELECT
        author_id,
        budget_allocation_id,
        team_id,
        total,
        sponsor,
        post_date,
        description,
        FROM teambudgets
        WHERE budget_allocations.budget_allocation_id = ?
        GROUP BY budget_allocations.budget_allocation_id, budget_allocations.team_id;`;
    const authorSql = "SELECT * FROM users WHERE user_id = ?";

    return new Promise((resolve, reject) => {
        // run each individual query
        const budgetAllocationPromise = new Promise((resolve, reject) => {
            connection.query(budgetAllocationSql, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });

        const authorPromise = new Promise((resolve, reject) => {
            connection.query(authorSql, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });

        // Resolve everything together
        Promise.all([budgetAllocationPromise, authorPromise])
            .then(([budgetAllocation, author]) => {
                resolve({budgetAllocation, author})
            })
            .catch(reject);
    });
};

/**
 * The "Budget Allocations" page needs:
 * - title (can be constructed with team information. Budget Allocation by [author])?
 */

exports.findAll = async (callback) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT budget_allocation_id FROM budget_allocations', (err, results) => { // add a school year filter later
            if (err) return reject(err);
            resolve(results);
        });
    });
}