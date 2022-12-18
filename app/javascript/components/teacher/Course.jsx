import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
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
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";

const Course = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const role = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/courses/${id}`)
      .then(({ data }) => {
        setCourse(data);
        setStudents(data.students);
      })
      .catch((error) => {});
  };

  const publishCourse = (id) => {
    axios.post(`/api/v1/courses/${id}/publish`).then(() => {
      toast.success("Successfully publish the course.");
      navigate("/home");
    });
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Card
          sx={{
            margin: 2,
            width: "50%",
            height: "435px",
            overflowY: "auto",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={`http://localhost:3000` + course.image}
            alt="course image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course.display_name}
              {course.draft === true ? (
                <Chip label="draft" color="warning" size="small" sx={{ ml: 1 }} />
              ) : (
                <Chip
                  label="published"
                  sx={{ bgcolor: theme.palette.secondary.dark, color: "white", ml: 1 }}
                  size="small"
                />
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {course.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Number of students enrolled :</strong> {students.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Difficulty Level :</strong> {course.level}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Total Hours</strong> {course.total_hours}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Total Income</strong> {course.total_income}
            </Typography>
          </CardContent>
          <CardActions>
            {role === "teacher" && (
              <>
                {course.draft === true && (
                  <Button
                    size="small"
                    onClick={() => publishCourse(course.id)}
                    variant="contained"
                    sx={{ mr: 1 }}
                  >
                    Publish
                  </Button>
                )}
                <Button
                  size="small"
                  to={`/course/${course.id}/edit`}
                  color="success"
                  variant="contained"
                  component={Link}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
              </>
            )}
          </CardActions>
        </Card>
        <Card
          sx={{
            margin: 2,
            width: "50%",
            height: "435px",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" sx={{ marginTop: 2, marginLeft: 2 }} component="div">
            Course Outline
          </Typography>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: course.outline }} />
          </CardContent>
        </Card>
      </Box>
      {role === "teacher" && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ margin: 2 }}>
              Enrolled Students
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ margin: 2, marginBottom: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>ID</TableCell>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Email</TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((row, index) => (
                  <Fragment key={row.id}>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.full_name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          sx={{ color: theme.palette.primary.light }}
                          to={`/show_student/${row.id}`}
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
        </>
      )}
    </Container>
  );
};

export default Course;
