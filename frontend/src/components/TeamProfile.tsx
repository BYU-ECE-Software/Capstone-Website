import React, { useEffect, useState } from 'react';
import UserTeamDirectoryLine from './users/UserTeamDirectoryLine';
import { fetchTeamById } from '../api/endpointCalls';
import './TeamProfile.css';
import { Team } from '../types/team';
import { Link } from 'react-router-dom';

export default function TeamProfile({ team_id=0 }: {team_id?: number}) {
    const [team, setTeam] = useState<Team | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const final_id: number = team_id;

    useEffect(() => {
        fetchTeamById(final_id)
        .then((data) => {
            setTeam(data);
        })
        .catch((err) => {
            console.error(err);
            setError("Team not found");
        });
    }, [final_id]);

    if (!team) return <p>Loading...</p>;
    if (error) return <p>{error}</p>


    // maybe I'll want to move this code to a team component and then just call it from here with the url param, and from teamsdirectory and input the team_id of each array item
    return (
        <div>
            <h1 className='"text-4xl text-byuNavy font-semibold mb-4'><Link to={`/teams/${team.team.team_id}`}>Team {team.team.team_number}</Link></h1>
            <img alt={`${final_id}`} src={`http://localhost:3001/assets/${team.team.logo}`} className='team-logo'/>
            {team.coach.length > 0 ?
                (team.coach.map((coach) => (<div key={coach.user_id} id="coach-info">
                    <p><b>Coach: </b>{coach.first_name + " " + coach.last_name}</p>
                    <p><b>Email: </b>{coach.email}</p>
                    <p><b>Cell Phone: </b>{coach.phone}</p>
                    <p><b>Work Phone: </b>N/A</p> {/* Change if we add a work phone field */}
                </div>))) : (<p>No coaches assigned to team</p>)
            }
            <div id="students">
                {(team.students.length > 0 && team.students) ? (team.students.map((student) => (
                    <UserTeamDirectoryLine key={student.user_id} student={student} />
                ))) : (<p>No students assigned team</p>)}
            </div>
        </div>
    );
}