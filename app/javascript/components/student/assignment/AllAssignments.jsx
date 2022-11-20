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
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Link as MuiLink } from "@mui/material";
import { toast } from "react-toastify";
import assignmentReportGenerator from "../../../services/assignmentReportGenerator";

const AllAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get("/api/v1/user_assignments")
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {});
  };

  const generateReport = () => {
    axios
      .post(`/api/v1/user_assignments/generate_report`)
      .then(({ data }) => {
        toast.success("You! successfully generate assignment report.");
      })
      .catch((error) => {});
  };

  const checkedAssignments = assignments.filter((assignment) => assignment.status === "checked");

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
          List of Assignments
        </Typography>
        <Button variant="contained" onClick={() => assignmentReportGenerator(checkedAssignments)}>
          Download report
        </Button>
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
              <TableCell sx={{ color: "white" }}>Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((row) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row.assignment.id}</TableCell>
                  <TableCell>{row.assignment.display_name}</TableCell>
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

export default AllAssignments;
