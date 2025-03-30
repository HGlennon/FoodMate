import React from 'react';
import {Typography, Container, Grid} from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { CssBaseline } from "@mui/material";

export default function NoPage() {

    return (
        <>
        <CssBaseline />
        <main>
            <div>
                <TopBar/>
                <GradientSection>
                    <Container maxWidth='md' sx={{ marginTop: "20px" }}>
                        <Grid container justifyContent="center" alignItems="center"  direction="column"> 
                            <SentimentVeryDissatisfiedIcon sx={{ fontSize: 150, color: 'white', marginTop: "30px" }}/>
                            <Typography variant="h4" sx={{ marginTop: "10px", fontWeight: 'bold', color: 'white'}}>
                                Error: 404
                            </Typography>
                            <Typography variant="h6" sx={{ marginTop: "3px", color: 'white'}}>
                                Page not found.
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginTop: "5px", color: '#e0dcda', maxWidth: '600px'}}>
                                The link you have followed could be broken, or the page may have been removed or moved somewhere else.
                            </Typography>
                        </Grid>
                    </Container>
                </GradientSection>
                <CustomBackground/>
            </div>
        </main>
        </>
    )
}