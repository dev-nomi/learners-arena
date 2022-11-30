import React from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";

const CheckoutCancel = () => {
  return (
    <Container sx={{ marginTop: 10 }}>
      <Box sx={{ textAlign: "center" }}>
        <HighlightOffRoundedIcon sx={{ fontSize: "60px" }} color="error" />
        <Typography component="h1" variant="h4" color="primary">
          Cancel Buy!
        </Typography>
      </Box>
    </Container>
  );
};

export default CheckoutCancel;
