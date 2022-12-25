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
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import { toast } from "react-toastify";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const AllCoupons = () => {
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const [coupons, setCoupons] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get("/api/v1/coupons")
      .then((response) => {
        setCoupons(response.data);
        setRows(response.data);
      })
      .catch((error) => {});
  };

  const sendCoupon = (couponCode) => {
    const data = new FormData();
    data.append("coupon_code", couponCode);

    axios
      .post("/send_coupons", data)
      .then((response) => {
        toast.success("Successfully send the coupon.");
      })
      .catch((error) => {});
  };

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const filteredRows = coupons.filter((row) => {
      return row.coupon_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
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
          Coupons
        </Typography>
        <Button to="/admin/add_coupon" component={Link} variant="contained">
          Add Coupon
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          alignContent: "center",
        }}
      >
        <TextField
          margin="normal"
          variant="outlined"
          placeholder="search..."
          type="search"
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Code</TableCell>
              <TableCell sx={{ color: "white" }}>Price Off</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.coupon_name}</TableCell>
                  <TableCell>
                    <Chip label={row.coupon_id} color="secondary" size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={"Rs. " + row.price_off} color="info" size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Send Coupon">
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => sendCoupon(row.coupon_id)}
                      >
                        <MailRoundedIcon />
                      </IconButton>
                    </Tooltip>
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

export default AllCoupons;
