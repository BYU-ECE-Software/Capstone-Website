import TeamForm from '../components/TeamForm';


    

export default function CreateTeam () {
    const createTeam = (data) => {
        //call endpoint to post team
    }
    return (
        <TeamForm onSubmit={createTeam} />
    );
}