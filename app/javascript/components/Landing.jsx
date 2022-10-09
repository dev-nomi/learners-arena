import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Errors from "../components/Errors";
import { useTheme } from "@mui/material/styles";

const Landing = () => {
  const [courses, setCourses] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 50) + "..." : str;
  };

  const initialize = () => {
    axios
      .get("/all_courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {});
  };

  const enroll = (course_id) => {
    const enroll_course = new FormData();
    enroll_course.append("enroll_course[course_id]", course_id);
    enroll_course.append("enroll_course[user_id]", user.id);

    axios
      .post("/api/v1/enrolled_courses/enroll", enroll_course)
      .then((response) => {
        toast.success("Successfully Enrolled a course.");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };
  return (
    <Container>
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
              <CardActions>
                {isLoggedIn && user?.role === "student" ? (
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: theme.palette.primary.light }}
                    onClick={() => enroll(course.id)}
                  >
                    Enroll
                  </Button>
                ) : (
                  <div></div>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Landing;
