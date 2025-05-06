import { createTheme } from "@mui/material/styles";

const baseText = { // Will (hopefully) control how fonts are changed
  typography: {
    fontFamily: "var(--app-font-family, 'Roboto', sans-serif)",
  },
};

export const theme = createTheme({ // Main theme of the website [https://www.youtube.com/watch?v=k8m_nLBH4UY&ab_channel=ridhwanio]
    palette: {
    mode: "light",
    background: { // CSS method which will create a smooth mix of two colours for the background [https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient]
      gradient: "linear-gradient(135deg, #008433 0%, #00561E 100%)",
      default: "#e8e8e8"
    },
    text: {
      primary: "#010101", // Black text for toolbar
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
      gradient: "linear-gradient(135deg, #333 30%, #111 100%)",
      default: "#121212"
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
      gradient: "linear-gradient(135deg, #000 30%, #222 100%)",
      default: "#000000"
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