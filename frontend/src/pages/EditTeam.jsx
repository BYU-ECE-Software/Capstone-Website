import { useParams } from 'react-router-dom';
import TeamForm from '../components/TeamForm';

export default function EditTeam() {
    const { id } = useParams();
    // call the /teams/:id api
    const initialData = {}; // data from database
    const updateTeam = (data) => {
        //call endpoint to put team
    }
    return (
        <TeamForm initialData={initialData} onSubmit={updateTeam} />
    );
}