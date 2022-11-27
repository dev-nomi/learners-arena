import React, { Fragment, useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get("/all_teachers")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {});

    axios
      .get("/all_students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {});

    axios
      .get("/all_courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {});
  };

  return (
    <Fragment>
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
          Admin Dashboard
        </Typography>
      </Box>
      <Grid container spacing={2} mt={2} mb={4}>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                gutterBottom
                color="primary"
                variant="h5"
                component="div"
                fontSize={"5.5rem"}
              >
                {courses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                gutterBottom
                color="primary"
                variant="h5"
                component="div"
                fontSize={"5.5rem"}
              >
                {teachers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Teachers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                gutterBottom
                color="primary"
                variant="h5"
                component="div"
                fontSize={"5.5rem"}
              >
                {students.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AdminDashboard;
