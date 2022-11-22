import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Container>
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          top: "50%",
          width: "100%",
          height: "100%",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default LoadingScreen;
