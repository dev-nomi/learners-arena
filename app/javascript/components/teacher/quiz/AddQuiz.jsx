import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, Menu, MenuItem, Grid } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTheme } from "@mui/material/styles";
import { TextFieldsRounded } from "@mui/icons-material";

const AddQuiz = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [formValues, setFormValues] = useState([
    { title: "", ans_key: "", question_type: "short_question" },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const [showWeek, SetShowWeek] = useState(true);

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
    const quiz = new FormData();
    quiz.append("quiz[display_name]", displayName);
    quiz.append("quiz[description]", description);
    quiz.append("quiz[course_id]", course.id);
    quiz.append("questions", JSON.stringify(formValues));
    quiz.append("quiz[week_no]", week);

    axios
      .post("/api/v1/quizzes", quiz)
      .then((response) => {
        toast.success("Successfully created the quiz.");
        setDisplayName("");
        setDescription("");
        setCourse("");
        navigate("/quizzes");
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
    setFormValues([...formValues, { title: "", ans_key: "", question_type: "short_question" }]);
    handleClose();
  };

  let addMultiChoiceFields = () => {
    setFormValues([
      ...formValues,
      {
        title: "",
        ans_key: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        question_type: "multi_question",
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
          Add Quiz
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
                  <TextField
                    required
                    fullWidth
                    name="ans_key"
                    label="Answer"
                    type="ans_key"
                    id="ans_key"
                    value={element.ans_key || ""}
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
                  <TextField
                    required
                    fullWidth
                    name="ans_key"
                    label="Answer"
                    type="ans_key"
                    id="ans_key"
                    value={element.ans_key || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="option1"
                        required
                        fullWidth
                        id="option1"
                        label="Option 1"
                        autoFocus
                        value={element.option1 || ""}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="option2"
                        required
                        fullWidth
                        id="option2"
                        label="Option 2"
                        autoFocus
                        value={element.option2 || ""}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="option3"
                        required
                        fullWidth
                        id="option3"
                        label="Option 3"
                        autoFocus
                        value={element.option3 || ""}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="option4"
                        required
                        fullWidth
                        id="option4"
                        label="Option 4"
                        autoFocus
                        value={element.option4 || ""}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </Grid>
                  </Grid>
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
            <MenuItem onClick={addMultiChoiceFields}>Multiple Choice</MenuItem>
          </Menu>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddQuiz;
