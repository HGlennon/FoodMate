import React from 'react';
import {Typography} from '@mui/material';
import TopBar from '../components/topbar';

export default function NoPage() {
    return (
        <>
        <main>
            <TopBar/>
            <div>
            <Typography>Error 404: No page found</Typography>
            </div>
        </main>
        </>
    )
}