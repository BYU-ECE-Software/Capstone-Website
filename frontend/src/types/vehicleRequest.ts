enum Complexity {
    advanced = "Advanced",
    routine = "Routine"
}

enum Schedule {
    immediate = "Immediately",
    schedule = "Schedule for state change"
}

export interface VehicleRequest {
    vehicle_request_id: number;
    team_number: string;
    team_id: number;
    state: string;
    pickup_date: Date;
    dropoff_date: Date;
    valid_van_card: boolean;
    trip_purpose: string;
    preferred_vehicle_name: string; // enum? these might change. Things to ask office and change in future
    total: number;
    vehicle_vendor_name: string;
    complexity: Complexity;
    schedule: Schedule;
    comment: string;
    description_text: string;
    post_date: Date;
    method_name: string; // these could be enums in frontend, even though they are FKs in backend
    financial_category_name: string; // ^^
    vr_month: number;
    office_notes: string;
    author_name: string;
    author_email: string;
    author_phone: string;
}