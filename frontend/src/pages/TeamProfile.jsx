import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TeamDirectory() {
    const { id } = useParams();

    return (
        <div>
            <h1>TODO: Make team profile (just one team)</h1>
            <h2>This is the profile for team {id}</h2>
        </div>
    );
}