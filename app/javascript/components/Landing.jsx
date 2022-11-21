import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  Box,
  Modal,
  Stack,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Errors from "../components/Errors";
import { useTheme } from "@mui/material/styles";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #1A374D",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

const Landing = () => {
  const [courses, setCourses] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    initialize();
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 50) + "..." : str;
  };

  const initialize = () => {
    axios
      .get("/all_courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {});
  };

  const enroll = (course_id) => {
    const enroll_course = new FormData();
    enroll_course.append("enroll_course[course_id]", course_id);
    enroll_course.append("enroll_course[user_id]", user.id);

    axios
      .post("/api/v1/enrolled_courses/enroll", enroll_course)
      .then((response) => {
        toast.success("Successfully enrolled into a course.");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };
  return (
    <Container>
      <Grid container spacing={2} mt={2} mb={4}>
        {courses.map((course) => (
          <Grid item xs={4} key={course.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000` + course.image}
                alt="course image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.display_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truncate(course.description)}
                </Typography>
              </CardContent>
              <CardActions>
                {isLoggedIn && user?.role === "student" ? (
                  <>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => {
                        handleOpen();
                        setModalData(course);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ bgcolor: theme.palette.primary.light }}
                      onClick={() => enroll(course.id)}
                    >
                      Enroll
                    </Button>
                  </>
                ) : (
                  <div></div>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ color: theme.palette.primary.main }} variant="h6" component="h2">
            {modalData?.display_name}
          </Typography>
          <Card
            sx={{
              marginTop: 2,
              width: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {modalData?.description}
              </Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <SignalCellularAltIcon />
                <Typography variant="body2" color="text.secondary">
                  {modalData?.level}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <QueryBuilderIcon />
                <Typography variant="body2" color="text.secondary">
                  {modalData?.total_hours} hours
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
            <Typography
              sx={{ color: theme.palette.primary.main, marginTop: 2, marginLeft: 2 }}
              variant="h6"
              component="h2"
            >
              Course Outline
            </Typography>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: modalData?.outline }} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Container>
  );
};

export default Landing;
