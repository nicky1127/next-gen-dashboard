import React from "react";
import { Paper } from "@mui/material";
import BankWallpaper from "./BankWallpaper";

const WorkingWindowArea = () => {
  return (
    <Paper
      sx={{
        height: "75vh",
        borderRadius: 0,
        backgroundColor: "background.paper",
        overflow: "hidden",
        boxShadow: "none",
      }}
    >
      <BankWallpaper />
    </Paper>
  );
};

export default WorkingWindowArea;
