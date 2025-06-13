// TODO setup DB

// for now we'll just use memory to test the endpoints
const users = [
    {
        id: 1,
        first_name: "Mason",
        last_name: "Lewis",
        preferred_name: null,
        major: 1, // 1 could be Mech engineering. Or anything
        net_id: "mlewis", // not actually my net id
        byu_id: 123456789, // neither
        email: "mlewis@byu.edu",
        team_id: 1,
        role_id: 1, // admin?
        phone: "015554681357"
    },
    {
        id: 2,
        first_name: "Jerry",
        last_name: "Seinfeld",
        preferred_name: null,
        major: 1, // 1 could be Mech engineering. Or anything
        net_id: "jersein", // not actually my net id
        byu_id: 223456789, // neither
        email: "jersien@byu.edu",
        team_id: 1,
        role_id: 2, // coach?
        phone: "015553572468"
    }
];

// this function will be replaced by an actual DB query
exports.findById = (id) => {
    return users[id - 1];
};