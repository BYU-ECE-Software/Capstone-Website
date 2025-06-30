import React from 'react';
import { Outlet } from 'react-router-dom';

export default function TeamsLayout() {
    return (
        <main>
            <Outlet />
        </main>
    );
}