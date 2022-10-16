import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Container,
  Link as MuiLink,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

const ReferenceLink = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [reference_link, setReferenceLinks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/reference_links/${id}`)
      .then((response) => {
        setReferenceLinks(response.data);
      })
      .catch((error) => {});
  };

  const handleDelete = (id) => {
    axios.delete(`/api/v1/reference_links/${id}`).then(() => {
      toast.success("Successfully delete the reference link.");
      initialize();
      setOpen(false);
      navigate("/reference_links");
    });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            margin: 3,
            width: "50%",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {reference_link.display_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {reference_link.description}
            </Typography>
            <MuiLink
              sx={{ mb: 2 }}
              target="_blank"
              underline="hover"
              rel="noreferrer"
              href={reference_link.url}
            >
              {reference_link.url}
            </MuiLink>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="error" onClick={handleClickOpen}>
              Delete
            </Button>
          </CardActions>
        </Card>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this reference link?"}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => handleDelete(reference_link.id)}
              variant="contained"
              color="success"
            >
              Yes
            </Button>
            <Button onClick={handleClose} autoFocus variant="contained" color="error">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ReferenceLink;
