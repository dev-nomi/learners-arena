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
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTheme } from "@mui/material/styles";
import { Link as MuiLink } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Handouts = () => {
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
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
        setRows(response.data);
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

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const filteredRows = handouts.filter((row) => {
      return row.display_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          alignContent: "center",
        }}
      >
        <TextField
          margin="normal"
          variant="outlined"
          placeholder="search..."
          type="search"
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 4 }}>
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
            {rows.map((row) => (
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
                    <Tooltip title="View handout">
                      <IconButton
                        size="small"
                        color="info"
                        to={`/handout/${row.id}`}
                        sx={{ color: theme.palette.primary.light }}
                        component={Link}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit handout">
                      <IconButton
                        size="small"
                        sx={{ color: theme.palette.success.main }}
                        to={`/handout/${row.id}/edit`}
                        component={Link}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete handout">
                      <IconButton
                        sx={{ color: theme.palette.error.main }}
                        size="small"
                        color="error"
                        onClick={() => handleClickOpen(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
