import React from 'react';

import './UserTeamDirectoryLine.css';

export default function UserTeamDirectoryLine({ student }) {
    return ( 
        <div className='user-line-table'>
            <div className='user-line-column'>
                <p><b>Student: </b> {student.first_name + " " + student.last_name}</p>
                <p><b>Phone Number: </b>{student.phone}</p>
                <p><b>NetId: </b>{student.net_id}</p>
            </div>
            <div className='user-line-column'>
                <p><b>Email: </b>{student.email}</p>
                <p><b>Major: </b>{student.major}</p> {/* change endpoint to join the majors table so it returns the string not just the id */}
            </div>
            <div className='user-line-column'>
                <img alt="Student Profile Pic" src={`http://localhost:3001/assets/${student.photo}`} className='student-profile' /> {/* how to not hardcode the server? */}
            </div>
        </div>
    );
} //<hr className='entry-divider'/>