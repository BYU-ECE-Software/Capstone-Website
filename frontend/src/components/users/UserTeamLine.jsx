export default function UserTeamLine({student}) {
    return (
        <div>
            <br/>
            <img alt={"student picture"} src={`http://localhost:3001/assets/${student.photo}`} className='user-image'/>
            <p><b>Student: </b>{student.first_name} {student.last_name}</p>
            <p><b>Phone Number: </b>{student.phone}</p>
            <p><b>NetId: </b>{student.net_id}</p>
            <p><b>Email: </b>{student.email}</p>
            <p><b>Major: </b>{student.major}</p> {/* on the back end pull from a major table to return this as text not just an FK */}
        </div>
    );
}