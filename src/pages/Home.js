import React, { useState} from "react";
import { Typography, Container, Grid, Card, CardActionArea, CardContent, CardMedia, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {GradientSection, CustomCard, CustomCardContent, CustomCardMedia } from "../components/styled";
import TopBar from "../components/topbar";

const cards = [
  { title: "Breakfast", image: "https://simply-delicious-food.com/wp-content/uploads/2022/09/Breakfast-board28-500x375.jpg", link: "http://localhost:3000/breakfast" },
  { title: "Lunch", image: "https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF_Y23_M_W27_UK_03_3_low-6510a59e.jpg", link: "http://localhost:3000/lunch" },
  { title: "Dinner", image: "https://assets.epicurious.com/photos/59a48f237e283157d14a5a6a/16:9/w_2560%2Cc_limit/How-to-Throw-a-Grocery-Store-Dinner-Party-hero-with-hands-15082017.jpg", link: "http://localhost:3000/dinner" },
  { title: "Dessert", image: "https://imageio.forbes.com/specials-images/imageserve/5dd31d942c886a0007ec71bd/Harry---David-Dessert-of-the-Month-Club/960x0.jpg?height=529&width=711&fit=bounds", link: "http://localhost:3000/dessert" },
];

export default function Home() {
  return (
    <>
      <TopBar />
      <GradientSection>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" sx={{ color: "#FFFFFF", fontWeight: 600 }} gutterBottom>
            Meals for the day.
          </Typography>
          <Grid container spacing={4} sx={{ marginTop: 3 }}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <CustomCard>
                  <CardActionArea href={card.link}>
                    <CustomCardMedia image={card.image} title={card.title} />
                    <CustomCardContent>
                      <Typography gutterBottom variant="h5" align="center" sx={{ color: "#FFFFFF", fontWeight: 600 }}>
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
    </>
  );
}
