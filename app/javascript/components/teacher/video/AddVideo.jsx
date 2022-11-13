import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";

const AddVideo = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [showWeek, SetShowWeek] = useState(true);

  useEffect(() => {
    initialize();
    if (selectedFile) {
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const video = new FormData();
    video.append("video[display_name]", displayName);
    video.append("video[description]", description);
    video.append("video[file]", selectedFile);
    video.append("video[course_id]", course.id);
    video.append("video[week_no]", week);

    axios
      .post("/api/v1/videos", video)
      .then((response) => {
        toast.success("Successfully created the video.");
        setDisplayName("");
        setDescription("");
        setSelectedFile("");
        setCourse("");
        setWeek("");
        navigate("/videos");
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
          Add Video
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
            multiline
            rows={4}
            name="description"
            label="Description"
            type="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {fileUrl && selectedFile && (
            <Box mt={2} textAlign="center">
              <div>Video Preview:</div>
              <video src={fileUrl} alt={selectedFile.name} height="100px" />
            </Box>
          )}
          <input
            accept="video/mp4,video/x-m4v,video/*"
            type="file"
            id="select-image"
            style={{ display: "none" }}
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <label htmlFor="select-image">
            <Button variant="contained" color="primary" component="span" sx={{ mt: 2 }}>
              Upload File
            </Button>
          </label>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddVideo;
