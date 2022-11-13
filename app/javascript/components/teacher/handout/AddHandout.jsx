import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";

const AddHandout = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showWeek, SetShowWeek] = useState(true);

  useEffect(() => {
    initialize();
    if (selectedPdf) {
      setPdfUrl(URL.createObjectURL(selectedPdf));
    }
  }, [selectedPdf]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const handout = new FormData();
    handout.append("handout[display_name]", displayName);
    handout.append("handout[description]", description);
    handout.append("handout[pdf]", selectedPdf);
    handout.append("handout[course_id]", course.id);
    handout.append("handout[week_no]", week);

    axios
      .post("/api/v1/handouts", handout)
      .then((response) => {
        toast.success("Successfully created the handout.");
        setDisplayName("");
        setDescription("");
        setSelectedPdf("");
        setCourse("");
        setWeek("");
        navigate("/handouts");
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

  const handleChange = (event) => {
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
          Add Handout
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
              <MenuItem key={course.id} value={course}>
                {course.display_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            select
            required
            fullWidth
            disabled={showWeek}
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
          {pdfUrl && selectedPdf && (
            <Box mt={2} textAlign="center">
              <div>Pdf Preview:</div>
              <img src={pdfUrl} alt={selectedPdf.name} height="100px" />
            </Box>
          )}
          <input
            accept="application/pdf"
            type="file"
            id="select-image"
            style={{ display: "none" }}
            onChange={(e) => setSelectedPdf(e.target.files[0])}
          />
          <label htmlFor="select-image">
            <Button variant="contained" color="primary" component="span" sx={{ mt: 2 }}>
              Upload Pdf
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

export default AddHandout;
