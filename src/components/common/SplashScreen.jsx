import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, LinearProgress, Fade } from "@mui/material";

const SplashScreen = () => {
  const { splashVisible } = useSelector((state) => state.app);

  return (
    <Fade in={splashVisible} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)",
          color: "white",
          zIndex: 9999,
          visibility: splashVisible ? "visible" : "hidden",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              fontWeight: 200,
              background: "linear-gradient(45deg, #ffffff 30%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NeoBank
          </Typography>
          <Typography
            variant="h3"
            sx={{
              mb: 4,
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            AI-Powered Banking
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              maxWidth: 400,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Starting your next-generation banking journey...
          </Typography>
        </Box>

        <Box sx={{ width: 200, mt: 3 }}>
          <LinearProgress
            sx={{
              height: 2,
              borderRadius: 1,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2196f3",
              },
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default SplashScreen;
