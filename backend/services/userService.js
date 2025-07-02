const userDAO = require("../daos/userDAO");

exports.getUserById = async (userId) => {
    // any permission checks we want to do. (not everyone can access the user directory)
    // this is the place for logic and stuff though

    return await userDAO.findById(userId);
};

exports.getAllUsers = async () => {
    return await userDAO.findAll();
};

exports.getAllStudents = async () => {
    return await userDAO.findAllStudents();
}