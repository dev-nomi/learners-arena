import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../../Errors";

const AddHandout = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPdf, setSelectedPdf] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
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

    axios
      .post("/api/v1/handouts", handout)
      .then((response) => {
        toast.success("Successfully created the handout.");
        setDisplayName("");
        setDescription("");
        setSelectedPdf("");
        navigate("/handouts");
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
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
            <Button variant="contained" color="primary" component="span">
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
