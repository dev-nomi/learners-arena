import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Errors from "../../Errors";

const EditVideo = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [totalWeeks, setTotalWeeks] = useState([]);

  useEffect(() => {
    if (selectedFile) {
      setFileUrl(URL.createObjectURL(selectedFile));
    } else {
      initialize();
    }
  }, [selectedFile]);

  const handleChange = (event) => {
    setCourse(event.target.value);
    const course = courses.find((c) => c.id === event.target.value);
    setTotalWeeks(course.total_weeks);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const video = new FormData();
    video.append("video[display_name]", displayName);
    video.append("video[description]", description);
    video.append("video[file]", selectedFile);
    video.append("video[course_id]", course);
    video.append("video[week_no]", week);

    axios
      .put(`/api/v1/videos/${id}`, video)
      .then((response) => {
        toast.success("Successfully update the video.");
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
      .get(`/api/v1/videos/${id}`)
      .then(({ data }) => {
        setDisplayName(data.display_name);
        setDescription(data.description);
        setCourse(data.course.id);
        setWeek(data.week_no);
        setTotalWeeks(data.course.total_weeks);
        setFileUrl("http://localhost:3000" + data.file);
      })
      .catch((error) => {});

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
          Edit Video
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
            onChange={(e) => handleChange(e)}
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.display_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            select
            required
            fullWidth
            label="Week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          >
            {[...Array(totalWeeks)].map((x, i) => (
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
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditVideo;
