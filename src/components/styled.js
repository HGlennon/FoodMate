import React from "react";
import { Typography, Container, Grid, Card, CardActionArea, CardContent, CardMedia, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomCard = styled(Card)({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#00E265",
    color: "white",
  });
  
  export const CustomCardMedia = styled(CardMedia)({
    paddingTop: "56.25%", // 16:9 aspect ratio
  });
  
  export const CustomCardContent = styled(CardContent)({
    flexGrow: 1,
  });
  
  export const GradientSection = styled(Box)({
    backgroundImage: "linear-gradient(135deg, #00C85B 30%, #008C3A 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative", 
    textAlign: "center", 
    zIndex: 1,
  });