// this will be the page for an individual team. Model somewhat off of the drupal site, then update with what the office says

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTeamById } from "../api/endpointCalls";
import UserTeamLine from "../components/users/UserTeamLine";


export default function TeamPage() {
    const [team, setTeam] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        fetchTeamById(id)
        .then((data) => {
            setTeam(data);
        })
        .catch((err) => console.error(err));
    });

    console.log(team.coach.first_name);
    if (!team) return <p>Loading...</p>;
    if (team.error) return <p>Team not found</p>

    return (
        <div>
            <h2>{team.team_id}</h2>
            <h3><b>Team Name: </b>{team.team_name}</h3>
            <p><b>School Year</b></p>
            <p>{team.school_year}</p>
            {(team.coach) && 
                <div>
                    <p><b>Coach: </b>{team.coach.first_name} {team.coach.last_name}</p>{/* when needed we can change this to loop through the coaches */}
                    <p><b>Email: </b>{team.coach.email}</p>
                    <p><b>Cell Phone:</b>{team.coach.phone}</p>
                </div>
            }
            {/* makes sure endpoint returns the grading coaches as user objects, not just the ids */}
            <p><b>Grading Coach 1: </b>{/*team.grading_coach_one.first_name} {team.grading_coach_one.last_name*/}</p>
            <p><b>Grading Coach 2: </b>{/*team.grading_coach_two.first_name} {team.grading_coach_two.last_name*/}</p>
            {team.students.map((student) => 
                <UserTeamLine student={student} />
            )}
        </div>
    );
}