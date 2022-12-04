import React, { useEffect, useState, useRef } from "react";
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
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { Chart } from "react-google-charts";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import InsightsIcon from "@mui/icons-material/Insights";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import jsPDF from "jspdf";
import CertificateTemplate from "../../CertificateTemplate";

const ShowCourse = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [studentQuizzes, setStudentQuizzes] = useState([]);
  const [studentAssignments, setStudentAssignments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [value, setValue] = useState("1");
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const reportTemplateRef = useRef(null);

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
        setVideos(data.videos);
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

  const viewed_videos = videos.filter((video) => video.viewed !== null);
  const unviewed_videos = videos.filter((video) => video.viewed === null);

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

  const videos_data = [
    ["Video", "Count"],
    ["viewed", viewed_videos.length],
    ["unviewed", unviewed_videos.length],
  ];

  const total = attempted_quizzes?.reduce(
    (prevValue, currentValue) => prevValue + currentValue.marks,
    0
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGeneratePdf = () => {
    setIsLoading(true);

    const doc = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [1100, 480],
    });

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
        setIsLoading(false);
      },
    });
  };

  return (
    <Container sx={{ marginTop: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          {course.display_name}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", typography: "body1", marginTop: 2 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<ContentPasteSearchIcon />} label="Course detail" value="1" />
              <Tab icon={<InsightsIcon />} label="Analytics" value="2" />
              <Tab icon={<WorkspacePremiumIcon />} label="Certificate" value="3" />
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
                marginTop: 1,
                marginBottom: 1,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card sx={{ width: "70%", margin: 2 }}>
                <Chart
                  chartType="PieChart"
                  data={quizzes_data}
                  options={{ title: "Quizzes", colors: ["#66bb6a", "#ef5350"] }}
                  width={"100%"}
                  height={"300px"}
                />
                <Typography sx={{ margin: 1 }}>
                  Predicted quiz marks: {total / attempted_quizzes.length || 0}
                </Typography>
              </Card>
              <Card sx={{ width: "70%", margin: 2 }}>
                <Chart
                  chartType="PieChart"
                  data={assignments_data}
                  options={{ title: "Assignments", colors: ["#66bb6a", "#ef5350"] }}
                  width={"100%"}
                  height={"300px"}
                />
              </Card>
              <Card sx={{ width: "70%", margin: 2 }}>
                <Chart
                  chartType="PieChart"
                  data={videos_data}
                  options={{ title: "Videos", colors: ["#66bb6a", "#ef5350"] }}
                  width={"100%"}
                  height={"300px"}
                />
              </Card>
            </Box>
          </TabPanel>
          <TabPanel value="3">
            {course?.enrolled_course?.progress > 90 ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button variant="contained" disabled={isLoading} onClick={handleGeneratePdf}>
                    {isLoading ? "Making..." : "Generate Certificate"}
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <div ref={reportTemplateRef}>
                    <CertificateTemplate
                      name={user?.first_name + " " + user?.last_name}
                      course={course.display_name}
                      date={new Date()
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ")}
                      certificateNo={Math.floor(100000000 + Math.random() * 900000000)}
                    />
                  </div>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <ErrorOutlineIcon sx={{ fontSize: "60px" }} color="warning" />
                <Typography component="h1" variant="h4" color="primary">
                  No certificate!
                </Typography>
              </Box>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default ShowCourse;
