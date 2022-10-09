import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";

const Course = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/courses/${id}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {});
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          margin: 3,
          width: "40%",
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
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of students enrolled : {course.enroll_courses_count}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Course;
