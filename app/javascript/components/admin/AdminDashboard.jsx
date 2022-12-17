import React, { Fragment, useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";
import TeacherLogo from "../../assests/teacher.png"
import StudentLogo from "../../assests/student.png"
import CourseLogo from "../../assests/graduation-cap.png"

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
            <img src={CourseLogo} width="100" />
              <Typography
                gutterBottom
                color="primary"
                variant="h5"
                component="div"
                fontSize={"2.5rem"}
              >
                {courses.length} Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent sx={{ textAlign: "center" }}>
            <img src={TeacherLogo} width="100" />
              <Typography
                gutterBottom
                color="primary"
                variant="h5"
                component="div"
                fontSize={"2.5rem"}
              >
                {teachers.length} Teachers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent sx={{ textAlign: "center" }}>
            <img src={StudentLogo} width="100" />
              <Typography
                gutterBottom
                color="primary"
                variant="h5"
                component="div"
                fontSize={"2.5rem"}
              >
                {students.length} Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AdminDashboard;
