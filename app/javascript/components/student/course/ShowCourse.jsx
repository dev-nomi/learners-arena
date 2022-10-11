import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Container, Card, CardContent, Link as MuiLink } from "@mui/material";

const ShowCourse = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [handouts, setHandouts] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/courses/${id}`)
      .then((response) => {
        setCourse(response.data);
        setHandouts(response.data.handouts);
      })
      .catch((error) => {});
  };
  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography component="h1" variant="h4">
        {course.display_name}
      </Typography>
      <Card
        sx={{
          marginTop: 2,
          width: "50%",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            List of Handouts
          </Typography>
          {handouts.map((handout) => (
            <li key={handout.id}>
              <MuiLink
                target="_blank"
                underline="hover"
                rel="noreferrer"
                href={`http://localhost:3000${handout.pdf}`}
              >
                {handout.display_name}
              </MuiLink>
            </li>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ShowCourse;
