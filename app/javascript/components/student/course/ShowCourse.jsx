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
  ListItem,
} from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const ShowCourse = () => {
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
    <Container sx={{ marginTop: 3 }}>
      <Typography component="h1" variant="h4">
        {course.display_name}
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6}>
          <Card
            sx={{
              marginTop: 2,
              width: "100%",
              boxShadow: 2,
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Course content
              </Typography>
              {[...Array(course.total_weeks)].map((x, i) => (
                <ListItem key={i} sx={{ display: "list-item" }}>
                  <MuiLink
                    underline="hover"
                    to={`/course/${course.id}/week/${i + 1}`}
                    component={Link}
                  >
                    Week {i + 1}
                  </MuiLink>
                </ListItem>
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
