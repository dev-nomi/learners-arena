import React from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const CheckoutCancel = () => {
  return (
    <Container sx={{ marginTop: 10 }}>
      <Box sx={{ textAlign: "center" }}>
        <HighlightOffRoundedIcon sx={{ fontSize: "60px" }} color="error" />
        <Typography component="h1" variant="h4" color="primary">
          Cancel Buy!
        </Typography>
        <Button sx={{ mt: 4 }} to="/courses_list" component={Link} variant="contained">
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutCancel;
