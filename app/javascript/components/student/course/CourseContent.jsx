import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Container,
  Card,
  Grid,
  CardContent,
  Stack,
  Link as MuiLink,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
} from "@mui/material";

const CourseContent = () => {
  let { week_id, course_id } = useParams();
  const [course, setCourse] = useState([]);
  const [handouts, setHandouts] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [referenceLinks, setReferenceLinks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/courses/${course_id}`)
      .then(({ data }) => {
        setCourse(data);
        setHandouts(data.handouts);
        setQuizzes(data.quizzes);
        setReferenceLinks(data.reference_links);
        setVideos(data.videos);
        setAssignments(data.assignments);
      })
      .catch((error) => {});
  };

  const weekWiseHandouts = () => {
    return handouts.filter((handout) => handout.week_no === parseInt(week_id));
  };

  const weekWiseReferenceLinks = () => {
    return referenceLinks.filter((reference_link) => reference_link.week_no === parseInt(week_id));
  };

  const weekWiseVideos = () => {
    return videos.filter((video) => video.week_no === parseInt(week_id));
  };

  const weekWiseAssignments = () => {
    return assignments.filter((assignment) => assignment.week_no === parseInt(week_id));
  };

  const weekWiseQuizzes = () => {
    return quizzes.filter((quiz) => quiz.week_no === parseInt(week_id));
  };

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography component="h1" variant="h4">
        Course Content: Week {week_id}
      </Typography>
      <Grid container spacing={2} mb={3}>
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
              {weekWiseHandouts().map((handout) => (
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
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{
              marginTop: 2,
              width: "100%",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                List of Videos
              </Typography>
              {weekWiseVideos().map((video) => (
                <li key={video.id}>
                  <MuiLink
                    underline="hover"
                    target="_blank"
                    to={`/show_video/${video.id}`}
                    component={Link}
                  >
                    {video.display_name}
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
              <Typography gutterBottom variant="h6" component="div">
                List of Reference Links
              </Typography>
              {weekWiseReferenceLinks().map((reference_link) => (
                <li key={reference_link.id}>
                  <MuiLink
                    target="_blank"
                    underline="hover"
                    rel="noreferrer"
                    href={reference_link.url}
                  >
                    {reference_link.display_name}
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
              <Typography gutterBottom variant="h6" component="div">
                List of Quizzes
              </Typography>
              {weekWiseQuizzes().map((quiz) => (
                <li key={quiz.id}>
                  <MuiLink
                    underline="hover"
                    target="_blank"
                    to={`/show_quiz/${quiz.id}`}
                    component={Link}
                  >
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
              <Typography gutterBottom variant="h6" component="div">
                List of Assignments
              </Typography>
              {weekWiseAssignments().map((assignment) => (
                <li key={assignment.id}>
                  <MuiLink
                    underline="hover"
                    target="_blank"
                    to={`/show_assignment/${assignment.id}`}
                    component={Link}
                  >
                    {assignment.display_name}
                  </MuiLink>
                </li>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseContent;
