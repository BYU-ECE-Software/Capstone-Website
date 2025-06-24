import React from 'react';

export default function UserTeamLine({ student }) {
    return (
        <div>
            <div id="column-1">
                <p><b>Student: </b> {student.first_name + " " + student.last_name}</p>
                <p><b>Phone Number: </b>{student.phone}</p>
                <p><b>NetId: </b>{student.net_id}</p>
            </div>
            <div id="column-2">
                <p><b>Email: </b>{student.email}</p>
                <p><b>Major: </b>{student.major}</p> {/* change endpoint to join the majors table so it returns the string not just the id */}
            </div>
            <div id="column-3">
                <img alt="Student Profile Pic" />
            </div>
        </div>
    );
}