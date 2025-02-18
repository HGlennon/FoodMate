import React from 'react'; 
import { Box, children } from '@mui/material';

function GradientSection() {
  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(135deg, #00C85B 30%, #008C3A 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative", 
        textAlign: "center", 
        zIndex: 1,
      }}
    >
    </Box>
  );
}

export default GradientSection;