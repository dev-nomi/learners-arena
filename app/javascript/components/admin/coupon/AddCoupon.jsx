import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, InputAdornment } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";
import LoadingButton from "@mui/lab/LoadingButton";

const AddCoupon = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [priceOff, setPriceOff] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const coupon = new FormData();
    coupon.append("coupon[name]", name);
    coupon.append("coupon[price_off]", priceOff);

    axios
      .post("/api/v1/coupons", coupon)
      .then((response) => {
        toast.success("Successfully created the coupon.");
        setIsLoading(false);
        setName("");
        setPriceOff("");
        navigate("/admin/all_coupons");
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
          Add Coupon
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name "
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="priceOff"
            label="priceOff"
            name="priceOff"
            autoFocus
            type="number"
            value={priceOff}
            InputProps={{
              startAdornment: <InputAdornment position="start">PK</InputAdornment>,
              endAdornment: <InputAdornment position="end">.00</InputAdornment>,
              inputProps: { min: 0 },
            }}
            onChange={(e) => setPriceOff(e.target.value)}
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

export default AddCoupon;
