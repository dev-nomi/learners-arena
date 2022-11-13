import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Errors from "../../Errors";

const EditReferenceLink = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reference_link = new FormData();
    reference_link.append("reference_link[display_name]", displayName);
    reference_link.append("reference_link[description]", description);
    reference_link.append("reference_link[url]", url);

    axios
      .put(`/api/v1/reference_links/${id}`, reference_link)
      .then((response) => {
        toast.success("Successfully update the reference link.");
        setDisplayName("");
        setDescription("");
        navigate("/reference_links");
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  const initialize = () => {
    axios
      .get(`/api/v1/reference_links/${id}`)
      .then(({ data }) => {
        setDisplayName(data.display_name);
        setDescription(data.description);
        setUrl(data.url);
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
          Edit Reference Link
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
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditReferenceLink;
