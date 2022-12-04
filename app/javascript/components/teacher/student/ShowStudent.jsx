import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Tab,
  Box,
  Typography,
  Container,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link as MuiLink,
  IconButton,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QuizIcon from "@mui/icons-material/Quiz";
import assignmentReportGenerator from "../../../services/assignmentReportGenerator";
import quizReportGenerator from "../../../services/quizReportGenerator";

const ShowStudent = () => {
  let { id } = useParams();
  const [student, setStudent] = useState([]);
  const [value, setValue] = React.useState("1");
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/students/${id}`)
      .then(({ data }) => {
        setStudent(data);
        setAssignments(data.user_assignments);
        setQuizzes(data.user_quizzes);
      })
      .catch((error) => {});
  };

  const unCheckedAssignments = assignments.filter(
    (assignment) => assignment.status === "in_progress" && assignment.attempted === true
  );

  const checkedAssignments = assignments.filter(
    (assignment) => assignment.status === "checked" && assignment.attempted === true
  );

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography component="h1" variant="h4">
        {student.full_name}
      </Typography>
      <Typography component="h6" variant="h6">
        {student.email}
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: 2 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<AssignmentIcon />} label="Unchecked Assignments" value="1" />
              <Tab icon={<QuizIcon />} label="Checked Quizzes" value="2" />
              <Tab icon={<AssignmentIcon />} label="Checked Assignments" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableContainer component={Paper} sx={{ marginTop: 1 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>ID</TableCell>
                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                    <TableCell sx={{ color: "white" }}>Status</TableCell>
                    <TableCell sx={{ color: "white" }}>Attempted</TableCell>
                    <TableCell sx={{ color: "white" }}>Marks</TableCell>
                    <TableCell sx={{ color: "white" }}>Course</TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unCheckedAssignments.map((row, index) => (
                    <Fragment key={row.id}>
                      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{index + 1}</TableCell>
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
                          <MuiLink to={`/course/${row.course.id}`} component={Link}>
                            {row.course.display_name}
                          </MuiLink>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            sx={{ color: theme.palette.primary.light }}
                            to={`/check_assignment/${row.id}`}
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
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button variant="contained" onClick={() => quizReportGenerator(quizzes)}>
                Download report
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: 1 }}>
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
                  {quizzes.map((row, index) => (
                    <Fragment key={row.id}>
                      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{index + 1}</TableCell>
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
                          <MuiLink to={`/course/${row.course.id}`} component={Link}>
                            {row.course.display_name}
                          </MuiLink>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value="3">
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                onClick={() => assignmentReportGenerator(checkedAssignments)}
              >
                Download report
              </Button>
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: 1 }}>
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
                  {checkedAssignments.map((row, index) => (
                    <Fragment key={row.id}>
                      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{index + 1}</TableCell>
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
                          <MuiLink to={`/course/${row.course.id}`} component={Link}>
                            {row.course.display_name}
                          </MuiLink>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default ShowStudent;
