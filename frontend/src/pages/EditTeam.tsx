import { useParams, useNavigate } from 'react-router-dom';
import TeamForm from '../components/TeamForm';
import { useEffect, useState } from 'react';
import { editTeam, fetchTeamById, deleteTeam } from '../api/endpointCalls';
import { Team } from '../types/team';
import { TeamFormData } from '../types/teamFormData';

export default function EditTeam() {
    const { id } = useParams<{ id?: string }>();
    const [team, setTeam] = useState<TeamFormData | null>(null);
    
    const convertTeamToTeamFormData = (team: Team) => {
        if (!team || !team.team) return null;
        return {
            ...team,
            team: {
                ...team.team,
                ER_director: team.team.ER_director?.toString() ?? "",
                long_distance_access_code: team.team.long_distance_access_code?.toString() ?? "",
                caedm_group_folder: team.team.caedm_group_folder?.toString() ?? "",
                project: team.team.project?.toString() ?? "",
                team_box_folder: team.team.team_box_folder?.toString() ?? "",
                class_document_folder: team.team.class_document_folder?.toString() ?? "",
            }
        }
    }

    useEffect(() => {
        fetchTeamById(parseInt(id!))
        .then((data) => {
            setTeam(convertTeamToTeamFormData(data));
        })
        .catch((err) => console.error(err));
    }, [id]);
    
    const navigate = useNavigate();
    const onCancel = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            navigate(`/teams/${id}`);
        } catch (err) {
            console.error(err);
        }
    };
    const onDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            console.log("Deleting team");
            await deleteTeam(team!.team.team_id);//!!id ? parseInt(id): 0);
            // TODO code isn't making it to this point
            console.log("Team deleted");
            navigate('/teams');
        } catch (err) {
            console.error(err);
        }
    };
    const updateTeam = async (data: Team) => {
        //call endpoint to put team
        const updated = await editTeam(data.team.team_id, data);
        navigate(`/teams/${updated.team.team_id}`);
        return updated;
    };

    if (!team) return <p>Loading...</p>;
    return (
        <div className="max-w-7xl mx-auto mt-4 mb-8 p-6 bg-white shadow-md rounded-md space-y-6">
            <h2 className="text-2xl text-byuNavy font-semibold mb-4">
                Edit Team {id}
            </h2>
            <TeamForm initialData={team} onSubmit={updateTeam} submitLabel={"Save"} onCancel={onCancel} deleteButton={true} onDelete={onDelete}/>
        </div>
    );
}