import React from "react";
import { Typography, Container, Box } from "@mui/material";
import Logo from "../assests/undraw_online_learning_re_qw08";
import AboutLogo from "../assests/undraw_education_f8ru";

const About = () => {
  return (
    <>
      <Container>
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          color="primary"
          sx={{ textAlign: "center", marginTop: 2 }}
        >
          About us
        </Typography>
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
    </>
  );
};

export default About;
