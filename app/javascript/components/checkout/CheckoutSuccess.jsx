import React from "react";
import { Link } from "react-router-dom";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Container, Box, Typography, Button } from "@mui/material";

const CheckoutSuccess = () => {
  return (
    <Container sx={{ marginTop: 10 }}>
      <Box sx={{ textAlign: "center" }}>
        <CheckCircleOutlineRoundedIcon sx={{ fontSize: "60px" }} color="success" />
        <Typography component="h1" variant="h4" color="primary">
          Successfully Buy!
        </Typography>
        <Button sx={{ mt: 4 }} to="/landing" component={Link} variant="contained">
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutSuccess;
