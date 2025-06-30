import { useParams } from 'react-router-dom';
import TeamForm from '../components/TeamForm';
import { useEffect, useState } from 'react';
import { fetchTeamById } from '../api/endpointCalls';

export default function EditTeam() {
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    
    useEffect(() => {
        fetchTeamById(id)
        .then((data) => {
            setTeam(data);
        })
        .catch((err) => console.error(err));
    }, [id]);
    //const initialData = team; // data from database
    const updateTeam = (data) => {
        //call endpoint to put team
    }
    console.log(id);
    console.log(team);
    if (!team) return <p>Loading...</p>;
    return (
        <div className="max-w-7xl mx-auto mt-4 mb-8 p-6 bg-white shadow-md rounded-md space-y-6">
            <h2 className="text-2xl text-byuNavy font-semibold mb-4">
                Edit Team {id}
            </h2>
            <TeamForm initialData={team} onSubmit={updateTeam} />
        </div>
    );
}