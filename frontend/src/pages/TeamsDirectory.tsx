import { useEffect, useState } from 'react';
import TeamProfile from '../components/TeamProfile';
import PageTitle from '../components/pageTitle';
import { fetchTeamIds } from '../api/endpointCalls';
import type { TeamId } from '../types/teamId';


export default function TeamDirectory() {
    const [teams, setTeams] = useState<TeamId[] | null>(null);

    useEffect(() => {
        fetchTeamIds()
        .then((data) => {
            setTeams(data);
        })
        .catch((err) => console.error('Error fetching teams:', err));
    }, []);

    if (!teams) return <p>Loading...</p>;

    var schoolYear = "2018-2019"; // api.getschoolyear or sumthin

    return (
        <>
            <PageTitle title={"Team Directory " + schoolYear}/>
            <div className='max-w-7xl mx-auto mt-4 mb-8 p-6 bg-white shadow-md rounded-md space-y-6'>
                <div id="teams">
                    {teams.map((team) => (
                        <TeamProfile key={team.team_id} team_id={team.team_id}/>
                    ))}
                </div>
            </div>
        </>
    );
}