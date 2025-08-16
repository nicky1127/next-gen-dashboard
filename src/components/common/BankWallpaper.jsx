import React from "react";
import { Box, Typography } from "@mui/material";

const BankWallpaper = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `
          linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.8) 100%),
          radial-gradient(circle at 20% 80%, rgba(33, 150, 243, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(33, 150, 243, 0.05) 0%, transparent 50%)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle geometric pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(30deg, transparent 40%, rgba(33, 150, 243, 0.02) 40%, rgba(33, 150, 243, 0.02) 60%, transparent 60%),
            linear-gradient(-30deg, transparent 40%, rgba(33, 150, 243, 0.02) 40%, rgba(33, 150, 243, 0.02) 60%, transparent 60%)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Central content */}
      <Box sx={{ textAlign: "center", zIndex: 1, maxWidth: 600, px: 3 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2196f3 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
            boxShadow: "0 8px 32px rgba(33, 150, 243, 0.2)",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "2rem",
              fontWeight: 300,
            }}
          >
            N
          </Typography>
        </Box>

        <Typography
          variant="h3"
          sx={{
            mb: 2,
            color: "text.primary",
            fontWeight: 300,
          }}
        >
          Next-Generation Banking
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.7,
            fontSize: "1.1rem",
          }}
        >
          Experience the future of financial services powered by artificial
          intelligence. Secure, intelligent, and designed for the modern world.
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 4 }}>
          {["AI Security", "Smart Analytics", "Instant Processing"].map(
            (feature, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    mx: "auto",
                    mb: 1,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {feature}
                </Typography>
              </Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BankWallpaper;
