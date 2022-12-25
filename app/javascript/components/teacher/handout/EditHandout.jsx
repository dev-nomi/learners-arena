import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Errors from "../../Errors";

const EditHandout = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPdf, setSelectedPdf] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (selectedPdf) {
      setPdfUrl(URL.createObjectURL(selectedPdf));
    } else {
      initialize();
    }
  }, [selectedPdf]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const handout = new FormData();
    handout.append("handout[display_name]", displayName);
    handout.append("handout[description]", description);
    handout.append("handout[pdf]", selectedPdf);

    axios
      .put(`/api/v1/handouts/${id}`, handout)
      .then((response) => {
        toast.success("Successfully update the handout.");
        setDisplayName("");
        setDescription("");
        setSelectedPdf("");
        navigate("/handouts");
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  const initialize = () => {
    axios
      .get(`/api/v1/handouts/${id}`)
      .then(({ data }) => {
        setDisplayName(data.display_name);
        setDescription(data.description);
        setPdfUrl("http://localhost:3000" + data.pdf);
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
          Edit Handout
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
            multiline
            rows={4}
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
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditHandout;
