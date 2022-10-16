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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

const ShowCourse = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [handouts, setHandouts] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [expanded, setExpanded] = useState("");
  const theme = useTheme();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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

  const weekWiseHandouts = (i) => {
    return handouts.filter((handout) => handout.week_no === i);
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
              bgcolor: theme.palette.primary.main,
              color: "white",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                List of Handouts
              </Typography>
              {[...Array(course.total_weeks)].map((x, i) => (
                <Accordion
                  sx={{ color: theme.palette.secondary.dark }}
                  key={i + 1}
                  expanded={expanded === `panel${i + 1}`}
                  onChange={handleChange(`panel${i + 1}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${i + 1}d-content`}
                    id={`panel${i + 1}d-header`}
                  >
                    <Typography>Week {i + 1}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {weekWiseHandouts(i + 1).map((handout) => (
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
                  </AccordionDetails>
                </Accordion>
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
