const userService = require('../services/userService');

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userService.getUserById(userId);

        if (!user) { // I assume this is the same as a not null check in JS
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err); // for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        if (req.query.role === '1') {
            const students = await userService.getAllStudents();
            res.json(students);
        } else if (req.query.role === '2') {
            const coaches = await userService.getAllCoaches();
            res.json(coaches);
        } else {
            const users = await userService.getAllUsers();
            res.json(users);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};