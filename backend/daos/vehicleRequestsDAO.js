const pool = require('../db/connection');


exports.findById = async (id) => { // TODO enumerate all the fields and give them aliases.
    const vehicleRequestSql = `SELECT
        vehicle_requests.vehicle_request_id,
        vehicle_requests.team_id,
        teams.team_number,
        vehicle_request_state.vehicle_request_state_name AS state,
        pickup_date,
        dropoff_date,
        valid_van_card,
        trip_purpose,
        vehicle_vendor_name,
        preferred_vehicle.preferred_vehicle_name,
        total,
        complexity,
        schedule,
        comment,
        description_text,
        post_date,
        method.method_name,
        financial_category.financial_category_name,
        vr_month,
        office_notes,
        CONCAT(users.first_name, ' ', users.last_name) AS author_name,
        users.email AS author_email,
        users.phone AS author_phone
    FROM vehicle_requests 
        INNER JOIN users ON vehicle_requests.author = users.user_id
        INNER JOIN teams ON vehicle_requests.team_id = teams.team_id
        INNER JOIN vehicle_request_state ON vehicle_requests.vehicle_request_state_id = vehicle_request_state.vehicle_request_state_id
        INNER JOIN preferred_vehicle ON vehicle_requests.preferred_vehicle = preferred_vehicle.preferred_vehicle_id
        INNER JOIN method ON vehicle_requests.method = method.method_id
        INNER JOIN financial_category ON vehicle_requests.financial_category = financial_category.financial_category_id
        INNER JOIN vehicle_vendors ON vehicle_requests.vendor = vehicle_vendors.vehicle_vendor_id
    WHERE vehicle_request_id = ?`
    const [rows] = await pool.query(vehicleRequestSql, [id]);
    console.log(rows);
    return rows[0];
};


exports.findAll = async () => {
    const vehicleRequestsSql = "SELECT vehicle_request_id FROM vehicle_requests"; // I think I'll do the same thing as teams. The everything page loops through the numbers then passes them to individual components that then call the individual endpoint
    const [rows] = await pool.query(vehicleRequestsSql);
    
    return rows;
}

// We'll probably want one that does it by team, just like with users...or we'll just filter on the frontend...