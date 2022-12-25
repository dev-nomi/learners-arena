import React, { useEffect, useState, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTheme } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 50) + "..." : str;
  };

  const initialize = () => {
    axios
      .get("/admin/courses")
      .then((response) => {
        setCourses(response.data);
        setRows(response.data);
      })
      .catch((error) => {});
  };

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const filteredRows = courses.filter((row) => {
      return row.display_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const handleChange = (courseID) => {
    axios
      .post(`/api/v1/courses/${courseID}/toggle_publish`)
      .then((response) => {
        let status = "";
        if (response.data.status == true) {
          status = "draft";
        } else {
          status = "published";
        }
        toast.success(`Successfully ${status} the course.`);
        setRows(
          rows.map((course) =>
            course.id === courseID ? { ...course, draft: response.data.status } : course
          )
        );
      })
      .catch((error) => {
        console.log(error);
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
          Courses
        </Typography>
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
      <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Created by</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Fragment key={row.id}>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.display_name}</TableCell>
                  <TableCell>{truncate(row.description)}</TableCell>
                  <TableCell>
                    {row.draft === true ? (
                      <Chip label="draft" color="warning" size="small" />
                    ) : (
                      <Chip
                        label="published"
                        sx={{ bgcolor: theme.palette.secondary.dark, color: "white" }}
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell>{`${row.teacher.first_name} ${row.teacher.last_name}`}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit course">
                      <IconButton
                        sx={{ color: theme.palette.success.main }}
                        to={`/admin/course/${row.id}/edit`}
                        component={Link}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View course">
                      <IconButton
                        sx={{ color: theme.palette.primary.light }}
                        to={`/admin/course/${row.id}`}
                        component={Link}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={row.draft ? "Publish course" : "Draft course"}>
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            checked={!row.draft}
                            onChange={(e) => handleChange(row.id)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllCourses;
