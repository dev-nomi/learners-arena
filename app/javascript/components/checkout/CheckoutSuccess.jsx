import React from "react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Box from "@mui/material/Box";
import { Container, Card, Typography } from "@mui/material";

const CheckoutSuccess = () => {
  return (
    <Container sx={{ marginTop: 10 }}>
      <Box sx={{ textAlign: "center" }}>
        <CheckCircleOutlineRoundedIcon sx={{ fontSize: "60px" }} color="success" />
        <Typography component="h1" variant="h4" color="primary">
          Successfully Buy!
        </Typography>
      </Box>
    </Container>
  );
};

export default CheckoutSuccess;
