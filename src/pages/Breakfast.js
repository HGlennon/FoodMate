import React from 'react';
import TopBar from '../components/topbar';
import { Typography, Card, CardContent, Grid, Container, Button, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import RecipeList from '../components/apiData'
import GradientSection from '../components/gradientSection';

// maybe include gluten and seafood free options 

export default function Breakfast() {
    return (
        <>
            <TopBar />
            <GradientSection/>

            <main>
                <div>
                    <Container maxWidth='md' style={{ marginTop: '30px' }}>
                    <Grid container justifyContent="center">
                        <Typography variant='h4' align='center' style={{ color: '#FFFFFF', fontWeight: 600}} gutterBottom>
                            Breakfast:
                        </Typography>
                    </Grid>
                    </Container>
                    <div>            
                        <Container maxWidth='md' style={{ marginTop: '35px' }}>
                        <Grid container spacing={2}>
                                <Card>
                                <CardContent>
                                <Typography variant="h6" align='center' style={{ color: '#FFFFFF', fontWeight: 600}} gutterBottom>
                                        Diet Options:
                                </Typography>
                                <FormGroup row>
                                    <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Balanced"/>
                                    <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="High-Protein"/>
                                    <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Low-Carb"/>
                                    <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Low-Fat"/>
                                    <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Low-Sugar"/>
                                </FormGroup>
                                </CardContent>
                            </Card>
                            </Grid>
                        </Container>
                        <Container maxWidth='md' style={{ marginTop: '60px' }}>
                        <Grid>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" align='center' style={{ color: '#FFFFFF', fontWeight: 600}} gutterBottom>
                                        Health Options:
                                    </Typography>
                                    <FormGroup row>
                                        <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Vegan"/>
                                        <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Vegetarian"/>
                                        <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Alcohol-Free"/>
                                        <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Nut-Free"/>
                                        <FormControlLabel control={<Checkbox  style={{color: '#FFFFFF'}}/>} label="Lactose-Free"/>
                                    </FormGroup>
                                </CardContent>
                            </Card>
                        </Grid>
                        </Container>
                        <Container maxWidth='md' style={{ marginBottom: '20px', marginTop:'20px'}}>
                            <Grid container justifyContent='space-between'>
                                <Button style={{backgroundColor: 'transparent'}} disableRipple>
                                    <Typography align='center' style={{ color: '#FFFFFF'}}  gutterBottom>
                                        Clear Filter 
                                    </Typography>
                                </Button>
                                <Button style={{backgroundColor: 'transparent'}} disableRipple>
                                    <Typography align='center' style={{ color: '#FFFFFF'}} gutterBottom >
                                        Submit
                                    </Typography>
                                </Button>
                            </Grid>
                        </Container>
                    </div>    
                </div>
            </main>
            <RecipeList />
        </>
    );
}