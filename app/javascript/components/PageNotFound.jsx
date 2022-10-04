import React from "react";
import { Container, Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h1">
          404
        </Typography>
        <Typography component="h1" variant="h5">
          The Page you requested could not found!
        </Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound;
