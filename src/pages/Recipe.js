import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container, CardActionArea } from '@mui/material';
import TopBar from '../components/topbar';
import { GradientSection } from '../components/styled';

const APP_ID = "837155ce"; 
const APP_KEY = "76b054a6c99b380eda97058ec73f6069";
const API_URL = `https://api.edamam.com/search?q=breakfast&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`;

export default function Recipe() {
    return (
        <>
        <TopBar />
        <div>
            <GradientSection>
                <h2>Recipe Page</h2>
            </GradientSection>
        </div>
        </>
    )
}

