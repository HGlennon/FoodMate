import React from 'react';
import TopBar from '../components/topbar';
import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, SvgIcon, Button, ButtonGroup, CardActionArea, Input, InputBase, IconButton  } from '@mui/material';
import GradientSection from '../components/gradientSection';

export default function Settings() {
    return (
        <>
        <TopBar />
        <GradientSection/>
        <main>
            <div>
            <Typography>Settings Page</Typography>
            </div>
        </main>
        </>
    )
}