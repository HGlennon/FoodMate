import React, { useState, useEffect, useContext  } from 'react';
import TopBar from '../components/topbar';
import { Typography, Card, CardContent, Grid, Container, Button, Checkbox, FormGroup, FormControlLabel, CssBaseline } from '@mui/material';
import RecipeList from '../components/apiData'
import {GradientSection, CustomCard, CustomCardContent, CustomCardMedia, CustomBackground } from "../components/styled";
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../components/themeProvider';


// maybe include gluten and seafood free options 

export default function Meals() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mealType = queryParams.get("mealType") || ""; // Extract mealType from URL
    const { themeMode, setThemeMode } = useContext(ThemeContext);
    
    const [filters, setFilters] = useState({
        balanced: false,
        highProtein: false,
        lowCarb: false,
        lowFat: false,
        lowSodium: false,
        vegan: false,
        vegetarian: false,
        alcoholFree: false,
        nutFree: false,
        lactoseFree: false
    });

    const [appliedFilters, setAppliedFilters] = useState({}); // Stores filters applied after clicking "Submit"

    // Handle checkbox change
    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.checked });
    };

    // Apply filters when clicking "Submit"
    const submitFilters = () => {
        setAppliedFilters({ ...filters });
    };

    // Reset filters when clicking "Clear Filter"
    const clearFilters = () => {
        const clearedFilters = {
            balanced: false,
            highProtein: false,
            lowCarb: false,
            lowFat: false,
            lowSodium: false,
            vegan: false,
            vegetarian: false,
            alcoholFree: false,
            nutFree: false,
            lactoseFree: false
        };
        setFilters(clearedFilters);
        setAppliedFilters(clearedFilters); // Also reset applied filters to fetch all recipes
    };
    return (
        <>
            <CssBaseline/>
            <TopBar />
            <main>
                <div>
                <GradientSection>
                    <Container maxWidth='md' style={{ marginTop: '30px' }}>
                    <Grid container justifyContent="center">
                        <Typography variant='h4' align='center' style={{ color: '#FFFFFF', fontWeight: 600}} gutterBottom>
                            {mealType}
                        </Typography>
                    </Grid>
                    </Container>
                    <div>            
                        <Container maxWidth='md' style={{ marginTop: '35px'}}>
                        <Grid container justifyContent={"center"}>
                                <CustomCard style={{ width: "100%", maxWidth: "800px" }}>
                                <CardContent>
                                <Typography variant="h6" align='center' style={{ color: '#FFFFFF', fontWeight: 600}} gutterBottom>
                                        Diet Options:
                                </Typography>
                                <FormGroup row sx={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                    <FormControlLabel control={<Checkbox name="balanced" checked={filters.balanced} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Balanced" />
                                    <FormControlLabel control={<Checkbox name="highProtein" checked={filters.highProtein} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="High-Protein" />
                                    <FormControlLabel control={<Checkbox name="lowCarb" checked={filters.lowCarb} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Low-Carb" />
                                    <FormControlLabel control={<Checkbox name="lowFat" checked={filters.lowFat} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Low-Fat" />
                                    <FormControlLabel control={<Checkbox name="lowSodium" checked={filters.lowSugar} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Low-Sodium" />
                                </FormGroup>
                                </CardContent>
                            </CustomCard>
                            </Grid>
                        </Container>
                        <Container maxWidth='md' style={{ marginTop: '50px' }}>
                        <Grid container justifyContent={"center"}>
                            <CustomCard style={{ width: "100%", maxWidth: "800px" }}>
                                <CardContent>
                                    <Typography variant="h6" align='center' style={{ color: '#FFFFFF', fontWeight: 600}} gutterBottom>
                                        Health Options:
                                    </Typography>
                                    <FormGroup row sx={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                    <FormControlLabel control={<Checkbox name="vegan" checked={filters.vegan} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Vegan" />
                                        <FormControlLabel control={<Checkbox name="vegetarian" checked={filters.vegetarian} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Vegetarian" />
                                        <FormControlLabel control={<Checkbox name="alcoholFree" checked={filters.alcoholFree} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Alcohol-Free" />
                                        <FormControlLabel control={<Checkbox name="nutFree" checked={filters.nutFree} onChange={handleFilterChange} sx={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Nut-Free" />
                                        <FormControlLabel control={<Checkbox name="lactoseFree" checked={filters.lactoseFree} onChange={handleFilterChange} style={{ color: '#FFFFFF', '&.Mui-checked': { color: "#FFFFFF" } }} />} label="Lactose-Free" />
                                    </FormGroup>
                                </CardContent>
                            </CustomCard>
                        </Grid>
                        </Container>
                        <Container maxWidth="md" style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <Grid container justifyContent="space-between">
                                <Button sx={{ backgroundColor: themeMode === "highContrast" ? "#FFD700" : themeMode === "dark" ? '#6B6B6B' : '#ff1919', color: themeMode === "highContrast" ? "#000000" : "#FFFFFF", padding: '8px 16px', boxShadow: 2, borderRadius: 1 }} onClick={clearFilters}>
                                    Clear Filter
                                </Button>
                                <Button sx={{ backgroundColor: themeMode === "highContrast" ? "#FFFF00" : themeMode === "dark" ? '#b2b3cc' : '#00E265', color: themeMode === "highContrast" ? "#000000" : "#FFFFFF", padding: '8px 16px', boxShadow: 2, borderRadius: 1 }} onClick={submitFilters}>
                                    Submit
                                </Button>
                            </Grid>
                        </Container>
                    </div>    
                    </GradientSection>
                </div>
            </main>
            <CustomBackground>
            <RecipeList mealType={mealType} filters={appliedFilters}/>
            </CustomBackground>
        </>
    );
}