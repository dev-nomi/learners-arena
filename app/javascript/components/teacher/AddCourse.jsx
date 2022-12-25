import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../Errors";
import { Editor } from "@tinymce/tinymce-react";

const AddCourse = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [level, setLevel] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("");
  const [paymentPlans, setPaymentPlans] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    initialize();
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const course = new FormData();
    course.append("course[display_name]", displayName);
    course.append("course[description]", description);
    course.append("course[image]", selectedImage);
    course.append("course[level]", level);
    course.append("course[total_hours]", totalHours);
    course.append("course[payment_plan_id]", paymentPlan);
    course.append("course[outline]", editorRef.current.getContent());

    axios
      .post("/api/v1/courses", course)
      .then((response) => {
        toast.success("Successfully created the course.");
        setDisplayName("");
        setDescription("");
        setSelectedImage("");
        setTotalHours("");
        setLevel("");
        setPaymentPlan("");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  const initialize = () => {
    axios
      .get("/api/v1/payment_plans")
      .then((response) => {
        setPaymentPlans(response.data);
      })
      .catch((error) => {});
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
          Add Course
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
            inputProps={{
              maxLength: 25,
            }}
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
            inputProps={{
              maxLength: 250,
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            select
            required
            fullWidth
            margin="normal"
            label="Difficulty Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <MenuItem value={"beginner"}>Beginner</MenuItem>
            <MenuItem value={"intermediate"}>Intermediate</MenuItem>
            <MenuItem value={"advanced"}>Advanced</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            name="total_hours"
            label="Total Hours"
            type="number"
            id="total_hours"
            value={totalHours}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 10);
            }}
            min={0}
            onChange={(e) => setTotalHours(e.target.value)}
          />
          <TextField
            select
            required
            fullWidth
            margin="normal"
            label="Payment Plan"
            value={paymentPlan}
            onChange={(e) => setPaymentPlan(e.target.value)}
          >
            {paymentPlans.map((paymentPlan) => (
              <MenuItem key={paymentPlan.id} value={paymentPlan.id}>
                {`${paymentPlan.payment_name} (Rs. ${paymentPlan.payment_price})`}
              </MenuItem>
            ))}
          </TextField>
          <Editor
            apiKey="1ng284s517ux8frzhkttvwkv4uk1qkiu8kebp5uddx6o8wuc"
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {imageUrl && selectedImage && (
            <Box mt={2} textAlign="center">
              <div>Image Preview:</div>
              <img src={imageUrl} alt={selectedImage.name} height="100px" />
            </Box>
          )}
          <input
            accept="image/*"
            type="file"
            id="select-image"
            style={{ display: "none" }}
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
          <label htmlFor="select-image">
            <Button sx={{ mt: 2 }} variant="contained" color="primary" component="span">
              Upload Image
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

export default AddCourse;
