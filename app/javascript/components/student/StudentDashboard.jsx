import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    initialize();
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 50) + "..." : str;
  };

  const initialize = () => {
    axios
      .get("/api/v1/enrolled_courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {});
  };
  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography component="h1" variant="h5">
        Student Dashboard
      </Typography>
      <Grid container spacing={2} mt={2} mb={4}>
        {courses.map((course) => (
          <Grid item xs={4} key={course.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000` + course.image}
                alt="course image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.display_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truncate(course.description)}
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentDashboard;
