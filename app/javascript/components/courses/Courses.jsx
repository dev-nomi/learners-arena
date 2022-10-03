import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`api/v1/courses/${id}`).then(() => {
      toast.success("Successfully Delete the course.");
      initialize();
      setOpen(false);
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 45) + "..." : str;
  };

  const initialize = () => {
    axios
      .get("api/v1/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {});
  };

  return (
    <>
      <Typography component="h1" variant="h3" mt={2}>
        All Courses
      </Typography>
      <Grid container spacing={2} mt={2} mb={4}>
        {courses.map((course) => (
          <Grid item xs={4} key={course.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000` + course.image}
                alt="green iguana"
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
                <Button size="small" variant="contained" color="info">
                  View
                </Button>
                <Button size="small" variant="contained" color="error" onClick={handleClickOpen}>
                  Delete
                </Button>
                <Button size="small" variant="contained" color="success">
                  Enroll
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
                {"Are you sure you want to delete this course?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => handleDelete(course.id)}>Yes</Button>
                <Button onClick={handleClose} autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Courses;
