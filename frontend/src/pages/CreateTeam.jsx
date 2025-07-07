import { createTeam } from '../api/endpointCalls';
import TeamForm from '../components/TeamForm';


    

export default function CreateTeam () {
    const handleCreateTeam = (data) => {
        //call endpoint to post team
        createTeam(data);
    }
    return (
        <div className="max-w-7xl mx-auto mt-4 mb-8 p-6 bg-white shadow-md rounded-md space-y-6">
            <h2 className="text-2xl text-byuNavy font-semibold mb-4">
                Create New Team
            </h2>
            <TeamForm onSubmit={handleCreateTeam} />
        </div>
    );
}