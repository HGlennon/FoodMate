import React, { useContext, useState }from "react";
import { Typography, Container, Grid, CardActionArea, CssBaseline } from "@mui/material";
import {GradientSection, CustomCard, CustomCardContent, CustomCardMedia, CustomBackground } from "../components/styled";
import TopBar from "../components/topbar";
import { theme } from '../components/themes';
import { ThemeContext } from "../components/themeProvider";

export default function Home() {

  {/* User settings */}
  const { themeMode } = useContext(ThemeContext);
  
  const getSavedFontSize = () =>
    parseInt(localStorage.getItem("fontSize") || "0", 10);
  
  const getSavedDyslexicFont = () =>
    localStorage.getItem("useDyslexicFont") === "true";
  
  const [appliedFontSize] = useState(getSavedFontSize());
  const [useDyslexicFont] = useState(getSavedDyslexicFont())

  const cards = [
    { title: "Breakfast", image: "/images/Breakfast.webp", link: "http://foodmate.dev/search?mealType=Breakfast" },
    { title: "Lunch", image: "/images/Lunch.jpg", link: "http://foodmate.dev/search?mealType=Lunch" },
    { title: "Dinner", image: "/images/Dinner.jpg", link: "http://foodmate.dev/search?mealType=Dinner" },
    { title: "Dessert", image: "/images/Dessert.jpg", link: "http://foodmate.dev/search?mealType=Dessert" },
  ];

  return (
    <>
    <CssBaseline/> {/*  Resets the default browser CSS for consistency [https://mui.com/material-ui/react-css-baseline/]*/}
      <TopBar />
      <GradientSection>
        <Container maxWidth="md" sx={{ marginTop: { xs: "40px", sm: "63px" }, justifyContent: "center", alignItems: "center", textAlign: "center"}}>
          <Typography variant="h1" 
          sx={{ 
            fontSize: { xs: `${32 + appliedFontSize}px`, 
            sm: `${40 + appliedFontSize}px`, 
            md: `${48 + appliedFontSize}px` }, 
            fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", 
            color: themeMode === "highContrast" ? "yellow" : "white", 
            textAlign: "center", 
            fontWeight: "bold" 
          }}>
            Meals for the day.
          </Typography>
          <Grid container spacing={4} sx={{ marginTop: 3 }}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={6} sm={4} md={3}>
                <CustomCard sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 3}}>
                  <CardActionArea href={card.link} aria-label={`Browse ${card.title} recipes`} sx={{ height: '100%' }}>
                    <CustomCardMedia image={card.image} alt="" aria-hidden="true" role="presentation" title={card.title} sx={{[theme.breakpoints.down('sm')]:{paddingTop: "75%"},}}/>
                    <CustomCardContent sx={{flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 1}}>
                      <Typography variant="h2" 
                      sx={{ 
                        fontSize: { xs: `${(useDyslexicFont ? 21 + (appliedFontSize/1.5) : 21 + (appliedFontSize/1.5))}px`, 
                        sm: `${(useDyslexicFont ? 25 + (appliedFontSize / 1.5) : 29 + (appliedFontSize/1.5))}px` }, 
                        fontFamily: useDyslexicFont ? "'OpenDyslexic', sans-serif" : "inherit", color: themeMode === "highContrast" ? "yellow" : "white", 
                        textAlign: "center", 
                        fontWeight: "bold", 
                        wordBreak: "break-word" 
                      }}>
                        {card.title}
                      </Typography>
                    </CustomCardContent>
                  </CardActionArea>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </GradientSection>
      <CustomBackground/>
    </>
  );
}
