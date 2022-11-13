import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";

const Course = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/courses/${id}`)
      .then((response) => {
        setCourse(response.data);
        setUsers(response.data.users);
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
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Card
          sx={{
            margin: 3,
            width: "50%",
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
              <strong>Number of students enrolled :</strong> {users.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Difficulty Level :</strong> {course.level}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Total Hours</strong> {course.total_hours}
            </Typography>
          </CardContent>
          <CardActions>
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
          </CardActions>
        </Card>
        <Card
          sx={{
            margin: 3,
            width: "50%",
          }}
        >
          <Typography variant="h5" sx={{ marginTop: 2, marginLeft: 2 }} component="div">
            Enrolled Students
          </Typography>
          <CardContent>
            {users.map((user) => (
              <Box
                key={user.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Box variant="h4" component="h1" sx={{ marginRight: 1 }}>
                  #{user.id}
                </Box>
                <Box
                  sx={{
                    bgcolor: "#6998AB",
                    color: "white",
                    padding: 1,
                    borderRadius: 1.5,
                    marginTop: 1,
                    boxShadow: 2,
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" component="div">
                    Name : {user.full_name}
                  </Typography>
                  <Typography variant="body2">Email : {user.email}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Card
          sx={{
            margin: 3,
            width: "100%",
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
    </Container>
  );
};

export default Course;
