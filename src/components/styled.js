import { styled } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Box } from "@mui/material";

export const CustomCard = styled(Card)(({ theme }) => ({ 
  background: theme.palette.mode === "dark" ? "#333131" : "#008654",
  color: theme.palette.text.primary,
}));

export const CustomCardContent = styled(CardContent)({
  flexGrow: 1,
});

export const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: "56.25%", 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('sm')]: {paddingTop: "75%"}
}));

// Covers the top half of the screen with a green theme.
export const GradientSection = styled(Box)(({ theme }) => ({ 
  backgroundImage: theme.palette.background.gradient,
  minHeight: "50vh",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  zIndex: 1,
  borderRadius: 3,
  boxShadow: 3,
  overflow: 'hidden',
  padding: theme.spacing(4, 0), [theme.breakpoints.down('sm')]: { minHeight: "auto", padding: theme.spacing(3, 0)}
}));

// Bottom half of the screen which is often white/clear
export const CustomBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
}));


  