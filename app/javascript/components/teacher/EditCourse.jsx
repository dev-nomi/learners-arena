import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Errors from "../Errors";
import { Editor } from "@tinymce/tinymce-react";

const EditCourse = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [level, setLevel] = useState("");
  const [outline, setOutline] = useState("");
  const editorRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const course = new FormData();
    course.append("course[display_name]", displayName);
    course.append("course[description]", description);
    course.append("course[image]", selectedImage);
    course.append("course[level]", level);
    course.append("course[outline]", editorRef.current.getContent());

    axios
      .put(`/api/v1/courses/${id}`, course)
      .then((response) => {
        toast.success("Successfully update the course.");
        setDisplayName("");
        setDescription("");
        setSelectedImage("");
        setLevel("");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    } else {
      initialize();
    }
  }, [selectedImage]);

  const initialize = () => {
    axios
      .get(`/api/v1/courses/${id}`)
      .then(({ data }) => {
        setDisplayName(data.display_name);
        setDescription(data.description);
        setLevel(data.level);
        setOutline(data.outline);
        setImageUrl(`http://localhost:3000` + data.image);
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
          Edit Course
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
          <Editor
            apiKey="1ng284s517ux8frzhkttvwkv4uk1qkiu8kebp5uddx6o8wuc"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={outline}
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
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditCourse;
