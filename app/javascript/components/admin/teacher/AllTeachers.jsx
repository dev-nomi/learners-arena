import React, { useEffect, useState, Fragment } from "react";
import {
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
  IconButton,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherID, setTeacherID] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = (id) => {
    setOpen(true);
    setTeacherID(id);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get("/all_teachers")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {});
  };

  const handleDelete = () => {
    axios.delete(`/api/v1/teachers/${teacherID}`).then(() => {
      toast.success("Successfully delete the teacher.");
      initialize();
      setOpen(false);
    });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          marginTop: 3,
        }}
      >
        <Typography component="h1" variant="h4">
          Teachers
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>No. of courses</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((row) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.courses.length}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.error.main }}
                      onClick={() => handleClickOpen(row.id)}
                    >
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
                    <Button onClick={handleDelete} variant="contained" color="success">
                      Yes
                    </Button>
                    <Button onClick={handleClose} autoFocus variant="contained" color="error">
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllTeachers;
