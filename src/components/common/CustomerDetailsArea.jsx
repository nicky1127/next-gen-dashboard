import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
} from "@mui/material";

const CustomerDetailsArea = () => {
  const { stage, data } = useSelector((state) => state.customer);

  const getStageTitle = () => {
    switch (stage) {
      case "initial":
        return "Welcome to NeoBank";
      case "identifying":
        return "Customer Identification";
      case "verifying":
        return "Identity Verification";
      case "verified":
        return `Welcome, ${data.name}`;
      default:
        return "NeoBank";
    }
  };

  const getStageDescription = () => {
    switch (stage) {
      case "initial":
        return "Ready to begin your AI-powered banking experience";
      case "identifying":
        return "Please provide your identification details";
      case "verifying":
        return "Verifying your identity with advanced AI security";
      case "verified":
        return "Identity verified • Account ready";
      default:
        return "";
    }
  };

  return (
    <Paper
      sx={{
        height: "25vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
        borderRadius: 0,
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h2"
              sx={{
                mb: 1,
                color: "text.primary",
                fontWeight: 300,
              }}
            >
              {getStageTitle()}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1.1rem",
              }}
            >
              {getStageDescription()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Card sx={{ minWidth: 200, textAlign: "center" }}>
                <CardContent sx={{ py: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    AI Security Level
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor:
                          stage === "verified" ? "#4caf50" : "#ff9800",
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {stage === "verified" ? "Verified" : "In Progress"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default CustomerDetailsArea;
