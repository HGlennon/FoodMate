import React, {useState} from 'react';
import {Typography, Container, Grid} from '@mui/material';
import TopBar from '../components/topbar';
import { CustomBackground, GradientSection } from '../components/styled';
import { CssBaseline } from "@mui/material";

export default function About() {
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
                          fontWeight: 'bold', 
                          color: 'white',
                          mt: "20px"
                      }}>
                          About FoodMate
                      </Typography>
                      <Typography variant="h2" 
                      sx={{ 
                          fontSize: `${20 + appliedFontSize}px`, 
                          fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                          marginTop: "10px", 
                          color: 'white'
                      }}>
                          FoodMate is a web application that was created for my university dissertation, and primarily serves as an accessibible, user oriented recipe search engine that allows users to search for recipes based on a wide range of different criteria, such as dietary and health restrictions, ingredients, cuisine types, allergies, and much more. 
                      </Typography>
                      <Typography variant="h3" 
                      sx={{ 
                          fontSize: `${18 + appliedFontSize}px`, 
                          fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
                          marginTop: "10px", 
                          color: 'white'
                      }}>
                        Created by Harrison Glennon
                      </Typography>
                      </Grid>
                  </Container>
              </GradientSection>
          </div>
      </main>
      </>
  );
}