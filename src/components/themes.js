import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#e8e8e8",
      gradient: "linear-gradient(135deg, #00C85B 30%, #008C3A 100%)",
    },
    text: {
      primary: "#010101",
    },
  },
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: "#FFFFFF !important", // Force white text for checkboxes
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
      primary: "#ffffff",
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