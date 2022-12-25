import React, { useEffect, useState, Fragment } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Container,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Link as MuiLink } from "@mui/material";
import { toast } from "react-toastify";
import quizReportGenerator from "../../../services/quizReportGenerator";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get("/api/v1/user_quizzes")
      .then((response) => {
        setQuizzes(response.data);
        setRows(response.data);
      })
      .catch((error) => {});
  };

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const filteredRows = quizzes.filter((row) => {
      return row.quiz.display_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const checkedQuizzes = quizzes.filter((quiz) => quiz.status === "checked");

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
          List of Quizzes
        </Typography>
        <Button variant="contained" onClick={() => quizReportGenerator(checkedQuizzes)}>
          Download report
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
      <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Attempted</TableCell>
              <TableCell sx={{ color: "white" }}>Marks</TableCell>
              <TableCell sx={{ color: "white" }}>Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row.quiz.id}</TableCell>
                  <TableCell>{row.quiz.display_name}</TableCell>
                  <TableCell>
                    {row.status === "in_progress" ? (
                      <Chip label="In progress" color="warning" size="small" />
                    ) : (
                      <Chip label="checked" color="success" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    {row.attempted === false ? (
                      <Chip label="false" color="error" size="small" />
                    ) : (
                      <Chip label="true" color="success" size="small" />
                    )}
                  </TableCell>
                  <TableCell>{row.marks}</TableCell>
                  <TableCell>
                    <MuiLink to={`/show_course/${row.course.id}`} component={Link}>
                      {row.course.display_name}
                    </MuiLink>
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

export default AllQuizzes;
