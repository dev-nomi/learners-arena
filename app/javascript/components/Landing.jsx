import React, { useEffect, useState, Fragment } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Landing = () => {
  const [courses, setCourses] = useState([]);

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
                <Button size="small" color="success" variant="contained">
                  Enroll
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Landing;
