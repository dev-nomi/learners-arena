import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import ReactPlayer from "react-player";

const Video = () => {
  let { id } = useParams();
  const [video, setVideo] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/v1/videos/${id}`).then(() => {
      toast.success("Successfully delete the video.");
      initialize();
      setOpen(false);
      navigate("/videos");
    });
  };

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
      }}
    >
      <Card
        sx={{
          margin: 2,
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
        ></Box>
        <ReactPlayer url={"http://localhost:3000" + video.file} controls={true} />
      </Card>
      <Card
        sx={{
          margin: 2,
          maxHeight: 150,
          width: 500,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video.display_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="error" variant="contained" onClick={handleClickOpen}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this video?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDelete(video.id)} variant="contained" color="success">
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus variant="contained" color="error">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Video;
