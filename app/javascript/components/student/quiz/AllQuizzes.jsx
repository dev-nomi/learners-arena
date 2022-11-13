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
  IconButton,
  Container,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTheme } from "@mui/material/styles";
import { Link as MuiLink } from "@mui/material";

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get("/api/v1/user_quizzes")
      .then((response) => {
        setQuizzes(response.data);
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
          List of Quizzes
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Attempted</TableCell>
              <TableCell sx={{ color: "white" }}>Marks</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((row) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row.quiz.id}</TableCell>
                  <TableCell>{row.quiz.display_name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{`${row.attempted}`}</TableCell>
                  <TableCell>{row.marks}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="info"
                      to={`/quiz/${row.id}`}
                      sx={{ color: theme.palette.primary.light }}
                      component={Link}
                    >
                      <VisibilityIcon />
                    </IconButton>
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
