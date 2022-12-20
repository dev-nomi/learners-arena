import React from "react";
import { Typography, Container, Box } from "@mui/material";
import ContactLogo from "../assests/undraw_contact_us_re_4qqt.svg";

const ContactUs = () => {
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
          Contact us
        </Typography>
      </Container>
      <div style={{ backgroundColor: "aliceblue" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
        >
          <Box sx={{ padding: 8 }}>
            <Typography gutterBottom variant="h2" component="div" color="primary">
              Emails
            </Typography>
            <Typography gutterBottom variant="h6" sx={{ mt: 2 }}>
              areefimran94@gmail.com
            </Typography>
            <Typography gutterBottom variant="h6" sx={{ mt: 2 }}>
              muhammadahmadmumtaz9@gmail.com
            </Typography>
          </Box>
          <Box sx={{ padding: 2 }}>
            <img src={ContactLogo} width="500" />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ContactUs;
