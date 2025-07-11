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

    if (!team) return <p>Loading...</p>;
    if (team.error) return <p>Team not found</p>

    return (
        <>
            <div className="max-w-7xl mx-auto mt-4 mb-8 p-6 bg-white shadow-md rounded-md">
                <h1 className="text-[30px]">{team.team_id}</h1>
                <h3><b>Team Name: </b>{team.team_name}</h3>
                <p><b>School Year:</b></p>
                <p>{team.school_year}</p>
                <br/>

                <p><b>Project:</b></p>
                <p><b>Sponsor:</b></p>
                <br/>
                
                <div>
                    <h2 className="text-[20px]">Coaches</h2>
                    {(team.coach) && <img alt={"coach picture"} src={`http://localhost:3001/assets/${team.coach.photo}`} className='user-image'/>}
                    <p><b>Coach: </b>{(team.coach) && (team.coach.first_name + " " + team.coach.last_name)}</p>{/* when needed we can change this to loop through the coaches */}
                    <p><b>Email: </b>{(team.coach) && team.coach.email}</p>
                    <p><b>Cell Phone:</b>{(team.coach) && team.coach.phone}</p>
                </div>
                <br/>
                {/* makes sure endpoint returns the grading coaches as user objects, not just the ids */}
                {/*<p><b>Grading Coach 1: </b>{team.grading_coach_one.first_name} {team.grading_coach_one.last_name}</p>
                <p><b>Grading Coach 2: </b>{team.grading_coach_two.first_name} {team.grading_coach_two.last_name}</p>*/}
                <h2 className="text-[20px]">Students</h2>
                {team.students.map((student) => 
                    <UserTeamLine student={student} />
                )}
            </div>
        </>
    );
}