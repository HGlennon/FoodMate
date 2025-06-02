import React, { useState } from 'react';
import { Typography, Container, Grid } from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import { CssBaseline } from "@mui/material";

export default function About() {
    const getSavedFontSize = () =>
        parseInt(localStorage.getItem("fontSize") || "0", 10);

    const getSavedDyslexicFont = () =>
        localStorage.getItem("useDyslexicFont") === "true";

    const [appliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont] = useState(getSavedDyslexicFont());

    const textStyle = {
        fontSize: `${16 + appliedFontSize}px`,
        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
        color: '#e0dcda',
        marginBottom: '2px',
        maxWidth: '800px',
        textAlign: 'left'
    };

    const sectionTitleStyle = {
        fontSize: `${20 + appliedFontSize}px`,
        fontWeight: 'bold',
        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
        color: 'white',
        marginTop: '10px',
        marginBottom: '4px'
    };

    return (
        <>
            <CssBaseline />
            <main>
                <div>
                    <TopBar />
                    <GradientSection>
                        <Container maxWidth='md' sx={{ marginTop: "20px" }}>
                            <Grid container justifyContent="center" alignItems="center" direction="column">
                                <Typography variant="h1" sx={{
                                    fontSize: `${34 + appliedFontSize}px`,
                                    fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit",
                                    fontWeight: 'bold',
                                    color: 'white',
                                    marginTop: "15px",
                                    marginBottom: "15px"
                                }}>
                                    About FoodMate
                                </Typography>

                                <Typography sx={textStyle}>
                                    FoodMate is a web application that was created for my university dissertation, and primarily serves as an accessible, user-oriented recipe search engine. It allows users to search for recipes based on a wide range of criteria such as dietary and health restrictions, ingredients, cuisine types, allergies, and much more.
                                </Typography>

                                <Typography sx={sectionTitleStyle}>
                                    Created by Harrison Glennon
                                </Typography>
                            </Grid>
                        </Container>
                    </GradientSection>
                    <CustomBackground />
                </div>
            </main>
        </>
    );
}
