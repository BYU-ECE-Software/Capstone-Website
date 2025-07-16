import { useNavigate } from 'react-router-dom';
import { createTeam, fetchTeamById } from '../api/endpointCalls';
import TeamForm from '../components/TeamForm';
import { Team } from '../types/team';
import { useState, useEffect } from 'react';
import { TeamFormData } from '../types/teamFormData';


    

export default function CreateTeam () {
    // const [workAround, setWorkAround] = useState<Team | null>(null);
    // const id: number = 1;
    // useEffect(() => {
    //         fetchTeamById(id)
    //         .then((data) => {
    //             setWorkAround(data);
    //         })
    //         .catch((err) => console.error(err));
    //     }, [id]);

    const navigate = useNavigate();

    const onCancel = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            navigate("/teams");
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateTeam = async (data: Team) => {
        //call endpoint to post team
        const created = await createTeam(data);
        navigate(`/teams/${created.team.team_id}`);
        return created;// {team: {team_id: created.team_id}};
    }

    return (
        <div className="max-w-5xl mx-auto mt-4 mb-8 p-6 bg-white shadow-md rounded-md space-y-6">
            <h2 className="text-2xl text-byuNavy font-semibold mb-4">
                Create New Team
            </h2>
            <TeamForm onSubmit={handleCreateTeam} submitLabel={"Create"} onCancel={onCancel} deleteButton={false} onDelete={onCancel/* just as a filler */}/>
        </div>
    );
}