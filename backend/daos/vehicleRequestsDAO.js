const pool = require('../db/connection');


exports.findById = async (id) => { // TODO enumerate all the fields and give them aliases.
    const vehicleRequestSql = `SELECT * FROM vehicle_requests 
        INNER JOIN users ON vehicle_requests.author = users.user_id
        INNER JOIN vehicle_request_state ON vehicle_requests.vehicle_request_state_id = vehicle_request_state.vehicle_request_state_id
        INNER JOIN preferred_vehicle ON vehicle_requests.preferred_vehicle = preferred_vehicle.preferred_vehicle_id
        INNER JOIN method ON vehicle_requests.method = method.method_id
        INNER JOIN financial_category ON vehicle_requests.financial_category = financial_category.financial_category_id
        WHERE vehicle_request_id = ?`
    const [rows] = await pool.query(vehicleRequestSql, [id]);
    console.log(rows);
    return rows[0];
};


exports.findAll = async () => {
    const vehicleRequestsSql = "SELECT * FROM vehicle_requests";
    const [rows] = await pool.query(vehicleRequestsSql);
    
    return rows;
}

// We'll probably want one that does it by team, just like with users...or we'll just filter on the frontend...