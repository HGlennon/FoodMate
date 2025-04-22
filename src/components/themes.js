import { createTheme } from "@mui/material/styles";

const baseText = { // Will (hopefully) control how fonts are changed
  typography: {
    fontFamily: "var(--app-font-family, 'Roboto', sans-serif)",
  },
};

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
          color: "white !important", // Checkbox text will be made white [https://stackoverflow.com/a/72193292]
        },
      },
    }}});

export const darkTheme = createTheme({
  baseText,
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
  baseText,
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      gradient: "linear-gradient(135deg, #000 30%, #222 100%)",
    },
    text: {
      primary: "#FFFF00", // Yellow text for high contrast
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFF00", // Yellow text
        },
      },
    },
    MuiSwitch: { // controls how the switches look in high contrast mode [https://stackoverflow.com/a/63250102]
      styleOverrides: { 
        switchBase: { // Controls default (unchecked) color for the thumb
          color: "yellow"
        },
        colorPrimary: {
          "&.Mui-checked": { // Controls checked color for the thumb
            color: "yellow"
          }
        },
        track: {
          backgroundColor: "white",
          ".Mui-checked.Mui-checked + &": { // Controls checked color for the track
            backgroundColor: "white"
          }
        }
      }
    }
},
});