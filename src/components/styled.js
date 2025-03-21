import { styled } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Box } from "@mui/material";

// Custom Card
export const CustomCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: theme.palette.mode === "dark" ? "#333" : "#00E265",
  color: theme.palette.text.primary,
  borderRadius: 3,
  boxShadow: 3,
}));

// Custom Background (Changes with Theme)
export const CustomBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
}));

// Card Media
export const CustomCardMedia = styled(CardMedia)({
  paddingTop: "56.25%",
});

// Custom Card Content
export const CustomCardContent = styled(CardContent)({
  flexGrow: 1,
});

// Gradient Section (Switches Between Light & Dark Mode)
export const GradientSection = styled(Box)(({ theme }) => ({
  backgroundImage: theme.palette.background.gradient,
  minHeight: "50vh",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  zIndex: 1,
  borderRadius: 3,
  boxShadow: 3,
}));




  