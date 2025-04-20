import { styled } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Box } from "@mui/material";

// Custom Card
export const CustomCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#333131" : "#00E265",
  color: theme.palette.text.primary,
}));

// Custom Card Content
export const CustomCardContent = styled(CardContent)({
  flexGrow: 1,
});

export const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: "56.25%",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('sm')]: {paddingTop: "75%"}
}));

export const GradientSection = styled(Box)(({ theme }) => ({
  backgroundImage: theme.palette.background.gradient,
  minHeight: "50vh",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  zIndex: 1,
  borderRadius: 3,
  boxShadow: 3,
  overflow: 'hidden', // Prevent content from bleeding out
  padding: theme.spacing(4, 0), [theme.breakpoints.down('sm')]: { minHeight: "auto", padding: theme.spacing(3, 0)}
}));

// Custom Background (Changes with Theme)
export const CustomBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
}));


  