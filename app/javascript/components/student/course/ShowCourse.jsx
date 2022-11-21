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
  Box,
  Tab,
} from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Chart } from "react-google-charts";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import InsightsIcon from "@mui/icons-material/Insights";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

const ShowCourse = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [studentQuizzes, setStudentQuizzes] = useState([]);
  const [studentAssignments, setStudentAssignments] = useState([]);
  const [value, setValue] = useState("1");

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/courses/${id}`)
      .then(({ data }) => {
        setCourse(data);
        setStudentQuizzes(data.student_quizzes);
        setStudentAssignments(data.student_assignments);
      })
      .catch((error) => {});
  };

  const attempted_quizzes = studentQuizzes.filter((quiz) => quiz.attempted === true);
  const unattempted_quizzes = studentQuizzes.filter((quiz) => quiz.attempted === false);

  const attempted_assignments = studentAssignments.filter(
    (assignment) => assignment.attempted === true
  );
  const unattempted_assignments = studentAssignments.filter(
    (assignment) => assignment.attempted === false
  );

  const quizzes_data = [
    ["Quiz", "Count"],
    ["attempted", attempted_quizzes.length],
    ["unattempted", unattempted_quizzes.length],
  ];

  const assignments_data = [
    ["Assignment", "Count"],
    ["attempted", attempted_assignments.length],
    ["unattempted", unattempted_assignments.length],
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography component="h1" variant="h4">
        {course.display_name}
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: 2 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<ContentPasteSearchIcon />} label="Course detail" value="1" />
              <Tab icon={<InsightsIcon />} label="Analytics" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
          </TabPanel>
          <TabPanel value="2">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <Card sx={{ width: "100%", marginRight: 1 }}>
                <Chart
                  chartType="PieChart"
                  data={quizzes_data}
                  options={{ title: "Quizzes", colors: ["#66bb6a", "#ef5350"] }}
                  width={"100%"}
                  height={"400px"}
                />
              </Card>
              <Card sx={{ width: "100%", marginLeft: 1 }}>
                <Chart
                  chartType="PieChart"
                  data={assignments_data}
                  options={{ title: "Assignments", colors: ["#66bb6a", "#ef5350"] }}
                  width={"100%"}
                  height={"400px"}
                />
              </Card>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default ShowCourse;
