import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Container,
  Card,
  Grid,
  CardContent,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const ShowCourse = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [handouts, setHandouts] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/courses/${id}`)
      .then((response) => {
        setCourse(response.data);
        setHandouts(response.data.handouts);
        setQuizzes(response.data.quizzes);
      })
      .catch((error) => {});
  };
  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography component="h1" variant="h4">
        {course.display_name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card
            sx={{
              marginTop: 2,
              width: "100%",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                List of Handouts
              </Typography>
              {handouts &&
                handouts.map((handout) => (
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
          <Card
            sx={{
              marginTop: 2,
              width: "100%",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                List of Quiz
              </Typography>
              {quizzes &&
                quizzes.map((quiz) => (
                  <li key={quiz.id}>
                    <MuiLink target="_blank" underline="hover" rel="noreferrer">
                      {quiz.display_name}
                    </MuiLink>
                  </li>
                ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{
              marginTop: 2,
              width: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {course.description}
              </Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <SignalCellularAltIcon />
                <Typography variant="body2" color="text.secondary">
                  {course.level}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <QueryBuilderIcon />
                <Typography variant="body2" color="text.secondary">
                  {course.total_hours} hours
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          <Card
            sx={{
              marginTop: 2,
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShowCourse;
