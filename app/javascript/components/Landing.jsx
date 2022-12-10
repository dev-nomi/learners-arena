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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Errors from "../components/Errors";
import { useTheme } from "@mui/material/styles";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import DiscountRoundedIcon from "@mui/icons-material/DiscountRounded";
import Logo from "../assests/undraw_online_learning_re_qw08";
import AboutLogo from "../assests/undraw_education_f8ru";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #1A374D",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
  overflowY: "auto",
};

const Landing = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const cardStyle = {
    maxWidth: 345,
    "&:hover": {
      boxShadow: 15,
    },
  };

  const handleDialogOpen = (course) => {
    setOpenDialog(true);
    setSelectedCourse(course);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

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

  const checkout = () => {
    setOpenDialog(false);

    const data = new FormData();
    data.append("course_id", selectedCourse.id);
    data.append("coupon_code", couponCode);

    axios
      .post("/checkout", data)
      .then(({ data }) => {
        window.open(data.url, "_self").focus();
        setCouponCode("");
      })
      .catch((error) => {});
  };

  return (
    <>
      <div style={{ backgroundColor: "aliceblue" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
          }}
        >
          <Box sx={{ padding: 8 }}>
            <Typography gutterBottom variant="h5" component="div" color="error">
              Are ready to learn?
            </Typography>
            <Typography gutterBottom variant="h2" component="div" color="primary">
              Learn with fun on any schedule
            </Typography>
            <Typography gutterBottom variant="body">
              Welcome to our e-learning platform, where you can access a world of knowledge from the
              convenience of your own device. With our intuitive interface and comprehensive course
              catalog, you can easily find the learning resources you need to succeed.
            </Typography>
            <Typography gutterBottom variant="h6" sx={{ lineHeight: 1, mt: 2 }}>
              So why wait? Start learning today and unlock your potential with our e-learning
              platform.
            </Typography>
          </Box>
          <Box sx={{ padding: 2 }}>
            <img src={Logo} width="500" />
          </Box>
        </Box>
      </div>
      <Container>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          color="primary"
          sx={{ textAlign: "center" }}
        >
          Our courses
        </Typography>
        <Grid container spacing={2} mt={2} mb={4}>
          {courses.slice(0, 9).map((course) => (
            <Grid item xs={4} key={course.id}>
              <Card sx={cardStyle}>
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
                  <Stack direction="row" alignItems="center" gap={1} sx={{ marginTop: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Rs: <strong>{course.payment_plan?.payment_price}</strong>
                    </Typography>
                    <Chip label={course.payment_plan.payment_name} color="secondary" size="small" />
                  </Stack>
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
                      {course?.payment_plan?.payment_price === 0 ||
                      course?.student_payment?.bought === true ? (
                        <Button size="small" variant="contained" onClick={() => enroll(course.id)}>
                          Enroll
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<ShoppingCartCheckoutRoundedIcon />}
                          onClick={() => handleDialogOpen(course)}
                        >
                          Buy
                        </Button>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            You want to buy {selectedCourse?.display_name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Price: {selectedCourse?.payment_plan?.payment_price}
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="coupon_code"
              label="Enter coupon code"
              type="text"
              fullWidth
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DiscountRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={checkout} autoFocus variant="contained">
              Checkout
            </Button>
          </DialogActions>
        </Dialog>
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
      <div style={{ backgroundColor: "aliceblue" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
          }}
        >
          <Box sx={{ padding: 8 }}>
            <Typography gutterBottom variant="h2" component="div" color="primary">
              Helping people to grow their careers, everyday!
            </Typography>
            <Typography gutterBottom variant="body">
              In addition to our extensive library of courses, our platform also offers a range of
              tools and resources to help you stay on track and achieve your goals. You can track
              your progress, participate in discussions with other learners, and receive
              personalized recommendations based on your interests and learning style.
            </Typography>
          </Box>
          <Box sx={{ padding: 2 }}>
            <img src={AboutLogo} width="500" />
          </Box>
        </Box>
      </div>
      <Container>
        <div style={{ backgroundColor: "aliceblue", margin: "120px", borderRadius: "20px" }}>
          <Box sx={{ padding: 5, textAlign: "center" }}>
            <Typography gutterBottom variant="h4" component="div" color="primary">
              Do you want to be an instructor?
            </Typography>
            <Button
              to="/sign_up"
              component={Link}
              color="secondary"
              variant="contained"
              sx={{ borderRadius: 4 }}
            >
              Join us
            </Button>
          </Box>
        </div>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Container maxWidth="sm" sx={{ textAlign: "center" }}>
            <Typography variant="body1" color="white">
              All rights reserved by learners arena.
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </>
  );
};

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {"Copyright © "}
      learners arena
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Landing;
