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
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ShowCourse = () => {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [studentQuizzes, setStudentQuizzes] = useState([]);
  const [studentAssignments, setStudentAssignments] = useState([]);
  const [value, setValue] = useState("1");
  const [certificate, setCertificate] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);

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

  function generateCertificate() {
    setIsLoading(true);

    const url = "https://api.make.cm/make/t/ecd11561-eedc-4a57-ad43-09985ae11f7a/sync";

    const headers = {
      "Content-Type": "application/json",
      "X-MAKE-API-KEY": "367211b1416ee5c7ed8d7d328c48191e7f112657",
    };

    const data = {
      customSize: {
        width: 1200,
        height: 600,
        unit: "px",
      },
      format: "pdf",
      data: {
        name: user?.first_name + " " + user?.last_name,
        course: course.display_name,
        date: new Date()
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" "),
      },
      postProcessing: {
        optimize: true,
      },
    };

    axios
      .post(url, data, {
        headers: headers,
      })
      .then(
        (response) => {
          setIsLoading(false);
          setCertificate(response.data.resultUrl);
        },
        (error) => {
          setIsLoading(false);
          console.log(error);
        }
      );
  }

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
        {course?.enrolled_course?.progress > 90 && (
          <Button variant="contained" disabled={isLoading} onClick={generateCertificate}>
            {isLoading ? "Making..." : "Generate Certificate"}
          </Button>
        )}
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
          <TabPanel value="3">
            {!certificate && (
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress />
                    <Typography component="h6" variant="h6" color="primary">
                      Generating certificate...
                    </Typography>
                  </>
                ) : (
                  <>
                    <ErrorOutlineIcon sx={{ fontSize: "60px" }} color="warning" />
                    <Typography component="h1" variant="h4" color="primary">
                      No certificate!
                    </Typography>
                  </>
                )}
              </Box>
            )}
            {certificate && (
              <>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    startIcon={<DownloadRoundedIcon />}
                    href={certificate}
                    target="_blank"
                  >
                    Download
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <Document
                    file={certificate}
                    loading={
                      <Box
                        sx={{
                          textAlign: "center",
                          marginTop: 2,
                        }}
                      >
                        <CircularProgress />
                        <Typography component="h6" variant="h6" color="primary">
                          Loading certificate...
                        </Typography>
                      </Box>
                    }
                  >
                    <Page pageNumber={1} />
                  </Document>
                </Box>
              </>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default ShowCourse;
