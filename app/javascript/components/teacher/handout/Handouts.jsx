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
  Container,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTheme } from "@mui/material/styles";
import { Link as MuiLink } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Handouts = () => {
  const [handouts, setHandouts] = useState([]);
  const [open, setOpen] = useState(false);
  const [handoutID, setHandoutID] = useState("");
  const theme = useTheme();

  const handleClickOpen = (id) => {
    setOpen(true);
    setHandoutID(id);
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
      .get("/api/v1/handouts")
      .then((response) => {
        setHandouts(response.data);
      })
      .catch((error) => {});
  };

  const handleDelete = () => {
    axios.delete(`/api/v1/handouts/${handoutID}`).then(() => {
      toast.success("Successfully delete the handout.");
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
          List of Handouts
        </Typography>
        <Button to="/add_handout" component={Link} variant="contained">
          Add Handout
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>Course</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {handouts.map((row) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.display_name}</TableCell>
                  <TableCell>{truncate(row.description)}</TableCell>
                  <TableCell>
                    <MuiLink to={`/course/${row.course.id}`} component={Link}>
                      {row.course.display_name}
                    </MuiLink>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="info"
                      to={`/handout/${row.id}`}
                      sx={{ color: theme.palette.primary.light }}
                      component={Link}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.success.main }}
                      to={`/handout/${row.id}/edit`}
                      component={Link}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: theme.palette.error.main }}
                      size="small"
                      color="error"
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
                    {"Are you sure you want to delete this handout?"}
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

export default Handouts;
