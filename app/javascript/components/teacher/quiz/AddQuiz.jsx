import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";

const AddQuiz = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const quiz = new FormData();
    quiz.append("quiz[display_name]", displayName);
    quiz.append("quiz[description]", description);
    quiz.append("quiz[course_id]", course);

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
        setCourses(response.data);
      })
      .catch((error) => {});
  };

  return (
    <Container component="main" maxWidth="xs">
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
            autoFocus
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="description"
            label="Description"
            type="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            id="outlined-select-role"
            select
            required
            fullWidth
            label="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.display_name}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddQuiz;
