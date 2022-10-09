import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

const Handout = () => {
  let { id } = useParams();
  const [handout, setHandout] = useState([]);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/v1/handouts/${id}`).then(() => {
      toast.success("Successfully delete the handout.");
      initialize();
      setOpen(false);
      navigate("/handouts");
    });
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/handouts/${id}`)
      .then((response) => {
        setHandout(response.data);
      })
      .catch((error) => {});
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
      }}
    >
      <Card
        sx={{
          margin: 2,
          maxWidth: 800,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            marginTop: 1,
            marginLeft: 1,
            marginRight: 1,
          }}
        >
          <Button
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="Pre"
            variant="contained"
          >
            Previous
          </Button>
          <Button disabled={pageNumber >= numPages} onClick={nextPage} variant="contained">
            Next
          </Button>
        </Box>
        <Document
          file={`http://localhost:3000` + handout.pdf}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <CardContent>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
        </CardContent>
      </Card>
      <Card
        sx={{
          margin: 2,
          maxHeight: 150,
          width: 500,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {handout.display_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {handout.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="error" variant="contained" onClick={handleClickOpen}>
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
          {"Are you sure you want to delete this handout?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDelete(handout.id)} variant="contained" color="success">
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus variant="contained" color="error">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Handout;
