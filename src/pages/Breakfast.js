import React from 'react';
import TopBar from '../components/topbar';
import { Typography, Card, CardContent, Grid, Container, Button, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import RecipeList from '../components/apiData'
import GradientSection from '../components/gradientSection';

const cards = [
    { title: 'Breakfast', image: "https://simply-delicious-food.com/wp-content/uploads/2022/09/Breakfast-board28-500x375.jpg", link: "http://localhost:3000/breakfast" },
    { title: 'Lunch', image: "https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF_Y23_M_W27_UK_03_3_low-6510a59e.jpg", link: "http://localhost:3000/lunch" },
    { title: 'Dinner', image: "https://assets.epicurious.com/photos/59a48f237e283157d14a5a6a/16:9/w_2560%2Cc_limit/How-to-Throw-a-Grocery-Store-Dinner-Party-hero-with-hands-15082017.jpg", link: "http://localhost:3000/dinner"},
    { title: 'Dessert', image: "https://imageio.forbes.com/specials-images/imageserve/5dd31d942c886a0007ec71bd/Harry---David-Dessert-of-the-Month-Club/960x0.jpg?height=529&width=711&fit=bounds", link: "http://localhost:3000/dessert"},
];

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