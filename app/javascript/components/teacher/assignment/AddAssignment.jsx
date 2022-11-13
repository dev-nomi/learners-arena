import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, Menu, MenuItem, Grid } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTheme } from "@mui/material/styles";
import { TextFieldsRounded } from "@mui/icons-material";

const AddAssignment = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [formValues, setFormValues] = useState([{ title: "", question_type: "short_question" }]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showWeek, SetShowWeek] = useState(true);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  useEffect(() => {
    initialize();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const assignment = new FormData();
    assignment.append("assignment[display_name]", displayName);
    assignment.append("assignment[description]", description);
    assignment.append("assignment[course_id]", course.id);
    assignment.append("questions", JSON.stringify(formValues));
    assignment.append("assignment[week_no]", week);

    axios
      .post("/api/v1/assignments", assignment)
      .then((response) => {
        toast.success("Successfully created the assignment.");
        setDisplayName("");
        setDescription("");
        setCourse("");
        navigate("/assignments");
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  const initialize = () => {
    axios
      .get("/api/v1/courses")
      .then((response) => {
        setCourses(response.data.draft_courses);
      })
      .catch((error) => {});
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addShortQuestionFields = () => {
    setFormValues([...formValues, { title: "", question_type: "short_question" }]);
    handleClose();
  };

  let addCodingQuestionFields = () => {
    setFormValues([
      ...formValues,
      {
        title: "",
        question_type: "coding_question",
      },
    ]);
    handleClose();
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSelectChange = (event) => {
    setCourse(event.target.value);
    SetShowWeek(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Add Assignment
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="display_name"
            label="Display Name"
            name="display_name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            id="outlined-select-role"
            margin="normal"
            select
            required
            fullWidth
            label="Course"
            value={course}
            onChange={(e) => handleSelectChange(e)}
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course}>
                {course.display_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            disabled={showWeek}
            select
            required
            fullWidth
            label="Week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          >
            {[...Array(course.total_weeks)].map((x, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {"Week " + (i + 1)}
              </MenuItem>
            ))}
          </TextField>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              {element.question_type === "short_question" ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="title"
                    label="Question"
                    type="title"
                    id="title"
                    value={element.title || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                </>
              ) : (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="title"
                    label="Question"
                    type="title"
                    id="title"
                    value={element.title || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                </>
              )}

              {index ? (
                <Button
                  color="error"
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </Button>
              ) : null}
            </div>
          ))}
          <Button
            variant="contained"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            endIcon={<AddCircleOutlineIcon />}
            fullWidth
            sx={{ mt: 2, bgcolor: theme.palette.primary.light, justifyContent: "space-between" }}
          >
            Add Question
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={addShortQuestionFields}>Short Question</MenuItem>
            <MenuItem onClick={addCodingQuestionFields}>Coding Question</MenuItem>
          </Menu>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddAssignment;
