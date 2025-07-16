// should I just have a User type? hmmmm.

export interface Coach {
    user_id: number;
    first_name: string;
    last_name: string;
    preferred_name?: string;
    major?: number; // probably also not needed for coach
    net_id: string;
    byu_id: number;
    email: string;
    team_id?: number; // this shouldn't be needed for a coach...
    phone: string; // number?
    photo: string;
}