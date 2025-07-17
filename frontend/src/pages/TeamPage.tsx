// this will be the page for an individual team. Model somewhat off of the drupal site, then update with what the office says

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTeamById } from "../api/endpointCalls";
import UserTeamLine from "../components/users/UserTeamLine";
import { Team } from "../types/team";


export default function TeamPage() {
    const [team, setTeam] = useState<Team | null>(null);
    const { id } = useParams<{ id?: string }>();
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        fetchTeamById(parseInt(id!))
        .then((data) => {
            setTeam(data);
        })
        .catch((err) => {
            console.error(err);
            setError("Team not found");
        });
    });

    if (!team) return <p>Loading...</p>;
    if (error) return <p>{error}</p>

    return (
        <>
            <div className="max-w-7xl mx-auto mt-4 mb-8 p-6 bg-white shadow-md rounded-md relative">
                <Link className="absolute top-4 right-4 text-byuRoyal" to={`/teams/edit/${team.team.team_id}`}>Edit</Link>
                <h1 className="text-[30px]">{team.team.team_number}</h1>
                <h3><b>Team Name: </b>{team.team.team_name}</h3>
                <p><b>School Year:</b></p>
                <p>{team.team.school_year}</p>
                <br/>

                <p><b>Project:</b></p>
                <p><b>Sponsor:</b></p>
                <br/>
                
                <div>
                    <h2 className="text-[20px]">Coaches</h2>
                    {(team.coach.length > 0) ? (team.coach.map((coach) => (
                        <div key={coach.user_id}>
                            <img alt={"coach"} src={`http://localhost:3001/assets/${coach.photo}`} className='user-image'/>
                            <p><b>Coach: </b>{(coach.first_name + " " + coach.last_name)}</p>{/* when needed we can change this to loop through the coaches */}
                            <p><b>Email: </b>{coach.email}</p>
                            <p><b>Cell Phone:</b>{coach.phone}</p>
                        </div>))) : (<p>No coaches assigned to team</p>)}
                </div>
                <br/>
                {/* makes sure endpoint returns the grading coaches as user objects, not just the ids */}
                {/*<p><b>Grading Coach 1: </b>{team.grading_coach_one.first_name} {team.grading_coach_one.last_name}</p>
                <p><b>Grading Coach 2: </b>{team.grading_coach_two.first_name} {team.grading_coach_two.last_name}</p>*/}
                <h2 className="text-[20px]">Students</h2>
                {team.students.map((student) => 
                    <UserTeamLine key={student.user_id} student={student} />
                )}
            </div>
        </>
    );
}