import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: { 
      default: "#e8e8e8",
      gradient: "linear-gradient(135deg, #00C85B 30%, #008C3A 100%)", // Sets a CSS gradient as the background colour
    },
    text: {
      primary: "#010101", // Black text
    },
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: "white !important", // Checkboxes will be  https://stackoverflow.com/a/72193292
        },
      },
    }}});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      gradient: "linear-gradient(135deg, #333 30%, #111 100%)",
    },
    text: {
      primary: "#ffffff", // White text
    },
  },
});

export const highContrastTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      gradient: "linear-gradient(135deg, #000 30%, #222 100%)",
    },
    text: {
      primary: "#FFFF00", // Bright yellow text for high contrast
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFF00", // Bright yellow text
        },
      },
    },
  },
});