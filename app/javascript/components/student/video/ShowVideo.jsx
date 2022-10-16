import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardActions, CardContent, Typography, Container, Button } from "@mui/material";
import ReactPlayer from "react-player";
import { useTheme } from "@mui/material/styles";

const ShowVideo = () => {
  let { id } = useParams();
  const [video, setVideo] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/videos/${id}`)
      .then((response) => {
        setVideo(response.data);
      })
      .catch((error) => {});
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            margin: 3,
            width: "50%",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: theme.palette.primary.light, mb: 2, textAlign: "center" }}
            >
              {video.display_name}
            </Typography>
            <ReactPlayer width="100%" url={"http://localhost:3000" + video.file} controls={true} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {video.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="secondary" variant="contained" onClick={() => navigate(-1)}>
              Back
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default ShowVideo;
