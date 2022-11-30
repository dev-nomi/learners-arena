import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, InputAdornment } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";
import LoadingButton from "@mui/lab/LoadingButton";

const AddPaymentPlan = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const payment_plan = new FormData();
    payment_plan.append("payment_plan[name]", name);
    payment_plan.append("payment_plan[price]", price);

    axios
      .post("/api/v1/payment_plans", payment_plan)
      .then((response) => {
        toast.success("Successfully created the payment plan.");
        setIsLoading(false);
        setName("");
        setPrice("");
        navigate("/admin/all_payment_plans");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Add Payment Plan
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            autoFocus
            type="number"
            value={price}
            InputProps={{
              startAdornment: <InputAdornment position="start">PK</InputAdornment>,
              endAdornment: <InputAdornment position="end">.00</InputAdornment>,
              inputProps: { min: 0 },
            }}
            onChange={(e) => setPrice(e.target.value)}
          ></TextField>
          {isLoading ? (
            <LoadingButton fullWidth loading variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </LoadingButton>
          ) : (
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Add
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AddPaymentPlan;
