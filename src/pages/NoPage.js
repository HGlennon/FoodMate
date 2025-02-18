import React from 'react';
import {Typography} from '@mui/material';
import TopBar from '../components/topbar';
import GradientSection from '../components/gradientSection';

export default function NoPage() {
    return (
        <>
        <main>
            <TopBar/>
            <GradientSection/>
            <div>
            <Typography>Error 404: No page found</Typography>
            </div>
        </main>
        </>
    )
}