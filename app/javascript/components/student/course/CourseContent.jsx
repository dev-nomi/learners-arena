import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Container,
  Card,
  Grid,
  CardContent,
  Link as MuiLink,
  Box,
  Tab,
  Stack,
  Button,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LinkIcon from "@mui/icons-material/Link";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ArticleIcon from "@mui/icons-material/Article";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Document, Page, pdfjs } from "react-pdf";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

const CourseContent = () => {
  let { week_id, course_id } = useParams();
  const [course, setCourse] = useState([]);
  const [handouts, setHandouts] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [referenceLinks, setReferenceLinks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [value, setValue] = useState("1");
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedHandout, setSelectedHandout] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    initialize();
  }, []);

  const viewVideo = (id) => {
    const video = new FormData();
    video.append("id", id);

    axios
      .post(`/api/v1/videos/view`, video)
      .then(({ data }) => {
        toast.success("You! successfully completed the video.");
        setVideos(videos.map((video) => (video.id === id ? { ...video, viewed: true } : video)));
      })
      .catch((error) => {});
  };

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
        setSelectedHandout(
          data.handouts.filter((handout) => handout.week_no === parseInt(week_id))[0]
        );
        setSelectedVideo(data.videos.filter((video) => video.week_no === parseInt(week_id))[0]);
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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography component="h1" variant="h4">
        {course.display_name}
      </Typography>
      <Typography component="h6" variant="h6">
        Course Content: Week {week_id}
      </Typography>
      <Box sx={{ width: "100%", typography: "body1", marginTop: 2 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<ArticleIcon />} label="Handouts" value="1" />
              <Tab icon={<VideoLibraryIcon />} label="Videos" value="2" />
              <Tab icon={<LinkIcon />} label="Reference Links" value="3" />
              <Tab icon={<QuizIcon />} label="Quizzes" value="4" />
              <Tab icon={<AssignmentIcon />} label="Assignments" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={2} mb={3}>
              {weekWiseHandouts().length === 0 ? (
                <Typography>No handout for this week!</Typography>
              ) : (
                <>
                  <Grid item xs={4}>
                    {weekWiseHandouts().map((handout) => (
                      <Card
                        key={handout.id}
                        sx={
                          selectedHandout.id === handout.id
                            ? {
                                border: 1,
                                borderColor: "primary.mian",
                                borderRadius: 1,
                                bgcolor: "primary.main",
                                padding: 1,
                                marginTop: 2,
                                marginBottom: 2,
                              }
                            : {
                                border: 1,
                                borderColor: "primary.main",
                                borderRadius: 1,
                                padding: 1,
                                marginTop: 2,
                                marginBottom: 2,
                              }
                        }
                        onClick={() => setSelectedHandout(handout)}
                      >
                        <Typography
                          sx={
                            selectedHandout.id === handout.id
                              ? { color: "white" }
                              : { color: "primary.main" }
                          }
                        >
                          {handout.display_name}
                        </Typography>
                      </Card>
                    ))}
                  </Grid>
                  <Grid item xs={8} sx={{ display: "flex", justifyContent: "center" }}>
                    <Card
                      sx={{
                        maxWidth: 800,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center",
                          marginTop: 1,
                          marginLeft: 1,
                          marginRight: 1,
                        }}
                      >
                        <Button
                          disabled={pageNumber <= 1}
                          onClick={previousPage}
                          className="Pre"
                          variant="contained"
                        >
                          Previous
                        </Button>
                        <Button
                          disabled={pageNumber >= numPages}
                          onClick={nextPage}
                          variant="contained"
                        >
                          Next
                        </Button>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography>{selectedHandout.display_name}</Typography>
                        <Typography>{selectedHandout.description}</Typography>
                      </Box>
                      <Document
                        file={`http://localhost:3000/${selectedHandout.pdf}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                      </Document>
                      <CardContent>
                        <div className="pagec">
                          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={2} mb={3}>
              {weekWiseVideos().length === 0 ? (
                <Typography>No video for this week!</Typography>
              ) : (
                <>
                  <Grid item xs={4}>
                    {weekWiseVideos().map((video) => (
                      <Card
                        key={video.id}
                        sx={
                          selectedVideo.id === video.id
                            ? {
                                border: 1,
                                borderColor: "primary.mian",
                                borderRadius: 1,
                                bgcolor: "primary.main",
                                padding: 1,
                                marginTop: 2,
                                marginBottom: 2,
                              }
                            : {
                                border: 1,
                                borderColor: "primary.main",
                                borderRadius: 1,
                                padding: 1,
                                marginTop: 2,
                                marginBottom: 2,
                              }
                        }
                        onClick={() => setSelectedVideo(video)}
                      >
                        <Stack direction="row" alignItems="center" gap={1}>
                          {video.viewed === null ? (
                            <RadioButtonUncheckedIcon
                              sx={
                                selectedVideo.id === video.id
                                  ? { color: "white" }
                                  : { color: "primary.main" }
                              }
                            />
                          ) : (
                            <CheckCircleOutlineIcon color="success" />
                          )}
                          <Typography
                            sx={
                              selectedVideo.id === video.id
                                ? { color: "white" }
                                : { color: "primary.main" }
                            }
                          >
                            {video.display_name}
                          </Typography>
                        </Stack>
                      </Card>
                    ))}
                  </Grid>
                  <Grid item xs={8}>
                    <ReactPlayer
                      onEnded={() => viewVideo(selectedVideo.id)}
                      width="100%"
                      url={"http://localhost:3000" + selectedVideo.file}
                      controls={true}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={2} mb={3}>
              {weekWiseReferenceLinks().length === 0 ? (
                <Typography>No Reference Link for this week!</Typography>
              ) : (
                <>
                  <Grid item xs={4}>
                    {weekWiseReferenceLinks().map((reference_link) => (
                      <Card
                        key={reference_link.id}
                        sx={{
                          border: 1,
                          borderColor: "primary.mian",
                          borderRadius: 1,
                          padding: 1,
                          marginTop: 1,
                          marginBottom: 1,
                        }}
                      >
                        <MuiLink
                          target="_blank"
                          underline="hover"
                          rel="noreferrer"
                          href={reference_link.url}
                        >
                          <Typography variant="h6">{reference_link.display_name}</Typography>
                        </MuiLink>
                        <Typography>{reference_link.description}</Typography>
                      </Card>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="4">
            <Grid container spacing={2} mb={3}>
              {weekWiseQuizzes().length === 0 ? (
                <Typography>No Quiz for this week!</Typography>
              ) : (
                <>
                  <Grid item xs={4}>
                    {weekWiseQuizzes().map((quiz) => (
                      <Card
                        key={quiz.id}
                        sx={{
                          border: 1,
                          borderColor: "primary.mian",
                          borderRadius: 1,
                          padding: 1,
                          marginTop: 1,
                          marginBottom: 1,
                        }}
                      >
                        <MuiLink
                          underline="hover"
                          target="_blank"
                          to={`/show_quiz/${quiz.id}`}
                          component={Link}
                        >
                          <Typography variant="h6">{quiz.display_name}</Typography>
                        </MuiLink>
                        <Typography>{quiz.description}</Typography>
                      </Card>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="5">
            <Grid container spacing={2} mb={3}>
              {weekWiseAssignments().length === 0 ? (
                <Typography>No Assignment for this week!</Typography>
              ) : (
                <>
                  <Grid item xs={4}>
                    {weekWiseAssignments().map((assignment) => (
                      <Card
                        key={assignment.id}
                        sx={{
                          border: 1,
                          borderColor: "primary.mian",
                          borderRadius: 1,
                          padding: 1,
                          marginTop: 1,
                          marginBottom: 1,
                        }}
                      >
                        <MuiLink
                          underline="hover"
                          target="_blank"
                          to={`/show_assignment/${assignment.id}`}
                          component={Link}
                        >
                          <Typography variant="h6">{assignment.display_name}</Typography>
                        </MuiLink>
                        <Typography>{assignment.description}</Typography>
                      </Card>
                    ))}
                  </Grid>
                </>
              )}
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default CourseContent;
