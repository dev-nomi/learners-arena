import React, { useEffect, useState, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const AllResponses = () => {
  const [responses, setResponses] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const filteredRows = responses.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const initialize = () => {
    axios
      .get("/api/v1/responses")
      .then((response) => {
        setResponses(response.data);
        setRows(response.data);
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
          Responses
        </Typography>
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
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Type</TableCell>
              <TableCell sx={{ color: "white" }}>Submitted by</TableCell>
              <TableCell sx={{ color: "white" }}>Submitted at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    {row.resp_type === "feedback" && (
                      <Chip label="feedback" color="success" size="small" />
                    )}
                    {row.resp_type === "complain" && (
                      <Chip label="complain" color="error" size="small" />
                    )}
                    {row.resp_type === "query" && (
                      <Chip label="query" color="warning" size="small" />
                    )}
                  </TableCell>
                  <TableCell>{row.user.full_name}</TableCell>
                  <TableCell>
                    <Chip label={row.submitted_at} color="info" size="small" />
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

export default AllResponses;
