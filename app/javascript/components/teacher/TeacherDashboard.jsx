import React, { useEffect, useState, Fragment } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  Box,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    initialize();
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 50) + "..." : str;
  };

  const initialize = () => {
    axios
      .get("/api/v1/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {});
  };

  const handleDelete = (id) => {
    axios.delete(`/api/v1/courses/${id}`).then(() => {
      toast.success("Successfully Delete the course.");
      initialize();
      setOpen(false);
    });
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          marginTop: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Teacher Dashboard
        </Typography>
        <Button to="/add_course" component={Link} variant="contained">
          Add Course
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((row) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.display_name}</TableCell>
                  <TableCell>{truncate(row.description)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="info" to={`/course/${row.id}`} component={Link}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={handleClickOpen}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
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
                    <Button onClick={() => handleDelete(row.id)}>Yes</Button>
                    <Button onClick={handleClose} autoFocus>
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default TeacherDashboard;
