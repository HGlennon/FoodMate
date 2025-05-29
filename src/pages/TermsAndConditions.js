import React, {useState} from 'react';
import {Typography, Container, Grid} from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import { CssBaseline } from "@mui/material";

export default function TermsAndConditions() {
    {/* User settings */}
    const getSavedFontSize = () =>
        parseInt(localStorage.getItem("fontSize") || "0", 10);
        
      const getSavedDyslexicFont = () =>
        localStorage.getItem("useDyslexicFont") === "true";
  
    const [appliedFontSize] = useState(getSavedFontSize());
    const [useDyslexicFont] = useState(getSavedDyslexicFont())

    return (
        <>
        <CssBaseline />
        <main>
            <div>
                <TopBar/>
                <GradientSection>
                    <Container maxWidth='md' sx={{ marginTop: "20px" }}>
                        <Grid container justifyContent="center" alignItems="center"  direction="column"> 
                            <Typography variant="h1" 
                            sx={{fontSize: `${34 + appliedFontSize}px`, 
                            fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                            marginTop: "10px", 
                            fontWeight: 'bold', 
                            color: 'white'
                        }}>
                        Terms and Conditions
                    </Typography>
                    <Typography variant="h2" 
                    sx={{ 
                        fontSize: `${20 + appliedFontSize}px`, 
                        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                        marginTop: "3px", 
                        color: 'white'
                    }}>
                        Please read these terms and conditions carefully before using our application.
                    </Typography>
                    <Typography variant="h3" 
                    sx={{ 
                        fontSize: `${16 + appliedFontSize}px`, 
                        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                        marginTop: "5px", 
                        color: '#e0dcda', 
                        maxWidth: '600px'
                    }}>
                        By accessing or using the application, you agree to be bound by these terms. If you do not agree with any part of the terms, you must not use the application.
                    </Typography>
                    </Grid>
                </Container>
            </GradientSection>
        </div>
        </main>
    </>
    )
}