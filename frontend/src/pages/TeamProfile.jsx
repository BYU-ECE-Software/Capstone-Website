import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserTeamLine from '../components/users/UserTeamLine';

export default function TeamDirectory() {
    const { id } = useParams();

    const [team, setTeam] = useState(null);

    useEffect(() => {
        fetch(`/teams/${id}`)
        .then((res) => res.json())
        .then(setTeam)
        .catch((err) => console.error('Error fetching team:', err));
    }, [id]);

    console.log(team);

    if (!team) return <p>Loading...</p>;

    // maybe I'll want to move this code to a team component and then just call it from here with the url param, and from teamsdirectory and input the team_id of each array item
    return (
        <div>
            <h1>Team {id}</h1>
            <img alt="Team logo" />
            <div id="coach-info">
                <p><b>Coach: </b>{team.coach.first_name + " " + team.coach.last_name}</p>
                <p><b>Email: </b>{team.coach.email}</p>
                <p><b>Cell Phone: </b>{team.coach.phone}</p>
                <p><b>Work Phone: </b>N/A</p> {/* Change if we add a work phone field */}
            </div>
            <div id="students">
                {team.students.map((student) => (
                    <UserTeamLine key={student.user_id} student={student} />
                ))}
            </div>
        </div>
    );
}