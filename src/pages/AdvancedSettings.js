import React from 'react';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import { CssBaseline, Typography } from '@mui/material';

export default function AdvancedSettings() {
    return (
        <>
        <CssBaseline/>
        <TopBar />
        <CustomBackground>
        <Typography variant="h4">Advanced Search</Typography>
        <Typography variant="h5">Only 1 search input required*</Typography>
        </CustomBackground>
        </>
    )
}