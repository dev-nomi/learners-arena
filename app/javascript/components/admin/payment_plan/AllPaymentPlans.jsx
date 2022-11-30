import React, { useEffect, useState, Fragment } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  Chip,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const AllPaymentPlans = () => {
  const [paymentPlans, setPaymentPlans] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get("/api/v1/payment_plans")
      .then((response) => {
        setPaymentPlans(response.data);
      })
      .catch((error) => {});
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          marginTop: 3,
        }}
      >
        <Typography component="h1" variant="h4">
          Payment Plans
        </Typography>
        <Button to="/admin/add_payment_plan" component={Link} variant="contained">
          Add Payment Plan
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentPlans.map((row, index) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.payment_name}</TableCell>
                  <TableCell>
                    <Chip label={"Rs. " + row.payment_price} color="info" size="small" />
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllPaymentPlans;
