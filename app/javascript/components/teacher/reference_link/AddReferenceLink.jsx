import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";

const AddReferenceLink = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [week, setWeek] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [showWeek, SetShowWeek] = useState(true);

  useEffect(() => {
    initialize();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reference_link = new FormData();
    reference_link.append("reference_link[display_name]", displayName);
    reference_link.append("reference_link[description]", description);
    reference_link.append("reference_link[course_id]", course.id);
    reference_link.append("reference_link[week_no]", week);
    reference_link.append("reference_link[url]", url);

    axios
      .post("/api/v1/reference_links", reference_link)
      .then((response) => {
        toast.success("Successfully created the reference link.");
        setDisplayName("");
        setDescription("");
        setCourse("");
        setWeek("");
        navigate("/reference_links");
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

  const handleSelectChange = (event) => {
    setCourse(event.target.value);
    SetShowWeek(false);
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
          Add Reference Link
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label="Url"
            name="url"
            type="url"
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddReferenceLink;
