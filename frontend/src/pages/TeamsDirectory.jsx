import React, { useEffect, useState } from 'react';
import TeamProfile from './TeamProfile';

export default function TeamDirectory() {
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        fetch(`/teams`)
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setTeams(data);
        })
        .catch((err) => console.error('Error fetching teams:', err));
    }, []);

    if (!teams) return <p>Loading...</p>;

    return (
        <>
            <h1 className='directory-header'>Team Directory 2018-2019</h1> {/* This will of course not be hardcoded */}
            <div id="teams">
                {teams.map((team) => (
                    <TeamProfile key={team.team_id} team_id={team.team_id}/>
                ))}
            </div>
        </>
    );
}