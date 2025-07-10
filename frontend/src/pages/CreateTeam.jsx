import { createTeam } from '../api/endpointCalls';
import TeamForm from '../components/TeamForm';


    

export default function CreateTeam () {
    const handleCreateTeam = async (data) => {
        //call endpoint to post team
        const created = await createTeam(data);
        console.log(created);
        // temp fix TODO modify backend so it returns team_id nested (rn it doesn't return it anywhere)
        return created;// {team: {team_id: created.team_id}};
    }
    return (
        <div className="max-w-5xl mx-auto mt-4 mb-8 p-6 bg-white shadow-md rounded-md space-y-6">
            <h2 className="text-2xl text-byuNavy font-semibold mb-4">
                Create New Team
            </h2>
            <TeamForm onSubmit={handleCreateTeam} submitLabel={"Create"} cancelRedirect={"/teams"}/>
        </div>
    ); // possible to redirect to previous page? Home page? What do we want here?
}