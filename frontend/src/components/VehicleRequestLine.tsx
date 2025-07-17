import { useState, useEffect } from "react";
import type { VehicleRequest } from "../types/vehicleRequest";
import { fetchVehicleRequestById } from "../api/endpointCalls";
import { Link } from "react-router-dom";

export default function VehicleRequestLine({vehicleRequestId}: {vehicleRequestId: number}) {
    const [vehicleRequest, setVehicleRequest] = useState<VehicleRequest | null>(null);

    useEffect(() => {
        fetchVehicleRequestById(vehicleRequestId)
        .then((data) => {
            setVehicleRequest(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [vehicleRequestId]);

    return (
        <div className="grid grid-cols-10 gap-4 ml-4 mr-4">
            <p>{vehicleRequest?.post_date.toString() ? new Date(vehicleRequest?.post_date).toLocaleDateString("en-US") : ""}</p>
            <p><Link to={`/teams/${vehicleRequest?.team_id}`}>{vehicleRequest?.team_number}</Link></p>
            <p>{/*This is where we'll put suggested vendor. Need to add to backend as well TODO*/}</p>
            <p>{vehicleRequest?.vehicle_vendor_name}</p>
            <p>{vehicleRequest?.description_text}</p>
            <p>{vehicleRequest?.total}</p>
            <p>4 score and 7 years ago</p>
            <Link to={`/vehicle_requests/edit/${vehicleRequest?.vehicle_request_id}`}>Edit</Link>
            <p>{vehicleRequest?.state}</p>
        </div>
    )
}